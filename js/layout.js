// Общая шапка, подвал и окно корзины для всех страниц. Меняешь здесь, меняется везде.

// Валюты: цены на сайте указаны в рублях, остальные валюты показываются по ориентировочному курсу
(function () {
  const LIST = [
    { code: "RUB", sym: "₽", name: "Российский рубль", dec: 0 },
    { code: "KZT", sym: "₸", name: "Казахстанский тенге", dec: 0 },
    { code: "USD", sym: "$", name: "Доллар США", dec: 2 },
    { code: "EUR", sym: "€", name: "Евро", dec: 2 },
    { code: "UAH", sym: "₴", name: "Украинская гривна", dec: 0 },
  ];
  // Запасные курсы (за 1 ₽) по данным ЦБ РФ на 08.10.2026, если свежие загрузить не удалось
  const FALLBACK = { RUB: 1, KZT: 5.307, USD: 0.011699, EUR: 0.010381, UAH: 0.52482 };
  const KEY = "wsmp-cur", RATES_KEY = "wsmp-rates-v1", TTL = 6 * 3600 * 1000;
  const rates = Object.assign({}, FALLBACK);
  let code = "RUB";
  try { const saved = localStorage.getItem(KEY); if (LIST.some((c) => c.code === saved)) code = saved; } catch (e) {}

  const cur = () => LIST.find((c) => c.code === code);
  const others = LIST.filter((c) => c.code !== "RUB");
  const valid = (r) => Boolean(r) && others.every((c) => Number.isFinite(r[c.code]) && r[c.code] > 0);
  const pick = (r) => { const o = {}; others.forEach((c) => { o[c.code] = r[c.code]; }); return o; };
  const apply = (r) => others.forEach((c) => { rates[c.code] = r[c.code]; });
  const emit = () => document.dispatchEvent(new CustomEvent("currency:change"));

  // Свежие курсы запрашиваем только если выбрана не рублёвая валюта, ответ хранится 6 часов
  function loadRates() {
    if (code === "RUB") return;
    try {
      const c = JSON.parse(localStorage.getItem(RATES_KEY));
      if (c && Date.now() - c.t < TTL && valid(c.rates)) { apply(c.rates); return; }
    } catch (e) {}
    fetch("https://open.er-api.com/v6/latest/RUB")
      .then((r) => r.json())
      .then((d) => {
        if (!d || d.result !== "success" || !valid(d.rates)) return;
        const r = pick(d.rates);
        apply(r);
        try { localStorage.setItem(RATES_KEY, JSON.stringify({ t: Date.now(), rates: r })); } catch (e) {}
        emit();
      })
      .catch(() => {});
  }

  function fmt(rub) {
    const c = cur();
    return (rub * rates[c.code]).toLocaleString("ru-RU", { minimumFractionDigits: c.dec, maximumFractionDigits: c.dec }) + " " + c.sym;
  }
  function set(next) {
    if (next === code || !LIST.some((c) => c.code === next)) return;
    code = next;
    try { localStorage.setItem(KEY, code); } catch (e) {}
    loadRates();
    emit();
  }

  window.WCUR = { LIST, code: () => code, cur, fmt, set };
  loadRates();
})();
// На странице нужен <body data-root="" data-page="..."> (в папке privilege/: data-root="../").
(function () {
  const root = document.body.dataset.root || "";
  const page = document.body.dataset.page || "";
  const ic = (d) => `<svg class="ic" viewBox="0 0 24 24">${d}</svg>`;

  const links = [
    ["akcii", "akcii.html", "Акции", ic('<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/>')],
    ["monitoring", "monitoring.html", "Мониторинг", ic('<path d="M3 12h4l3-8 4 16 3-8h4"/>')],
    ["rules", "rules.html", "Правила", ic('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>')],
    ["media", "media.html", "Стать медиа", ic('<path d="M3 7h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3z"/><path d="M17 11l4-2v6l-4-2"/>')],
  ];
  const navHtml = links.map(([key, href, label, icon]) =>
    `<a href="${root}${href}"${key === page ? ' aria-current="page"' : ""}><span class="ico">${icon}</span>${label}</a>`).join("");

  const curHtml = `
        <div class="cur" id="cur">
          <button class="cur-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="cur-menu" aria-label="Валюта">
            <span class="cur-sym" id="cur-sym">${WCUR.cur().sym}</span>
            <svg class="cur-chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="cur-menu" id="cur-menu" role="group" aria-label="Выбор валюты">
            ${WCUR.LIST.map((c) => `<button class="cur-opt" type="button" data-cur="${c.code}" aria-pressed="${c.code === WCUR.code()}"><b>${c.sym}</b><span>${c.code} · ${c.name}</span></button>`).join("")}
            <p class="cur-note">Оплата в рублях. Остальные валюты показаны по ориентировочному курсу.</p>
          </div>
        </div>`;
  const header = `
<div class="island-wrap">
  <div class="wrap">
    <header class="island">
      <a class="logo" href="${root}index.html">Warden<span>SMP</span></a>
      <div class="online"><div><b data-online>—</b><small>игроков онлайн</small></div></div>
      <nav class="nav" id="nav">${navHtml}</nav>
      <div class="island-actions"><a class="pass-btn" id="pass-btn" href="${root}passport/" aria-label="Паспорт игрока"${document.body.dataset.page === "passport" ? ' aria-current="page"' : ""}>
          ${ic('<circle cx="12" cy="8" r="4"/><path d="M4 21c.9-4 4-6 8-6s7.1 2 8 6"/>')}
          <span class="pass-txt">Паспорт</span>
        </a>${curHtml}
        <button class="icon-btn" type="button" data-cart-open aria-haspopup="dialog" aria-label="Корзина">
          ${ic('<path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.2a1 1 0 0 0 1-.8L19 8H6"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>')}
          <span class="badge"></span>
        </button>
        <button class="icon-btn nav-toggle" type="button" aria-expanded="false" aria-controls="nav" aria-label="Меню">
          <span class="burger" aria-hidden="true"><i></i><i></i><i></i></span>
        </button>
      </div>
    </header>
  </div>
</div>`;

  const footer = `
<footer class="site-footer">
  <div class="wrap">
    <div class="sf-card">
      <div class="sf-top">
        <div class="sf-brand">
          <a class="logo" href="${root}index.html">Warden<span>SMP</span></a>
          <div class="sf-online"><i aria-hidden="true"></i>Онлайн: <b data-online>—</b></div>
          <div class="sf-social">
            <a href="https://vk.ru/w_smp" target="_blank" rel="noopener" aria-label="VK" title="VK"><span class="sf-vk">VK</span></a>
            <a href="https://discord.gg/DGthvPcgk8" target="_blank" rel="noopener" aria-label="Discord" title="Discord"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="12" r="1.2" fill="currentColor"/></svg></a>
            <a href="https://t.me/w_smp" target="_blank" rel="noopener" aria-label="Telegram" title="Telegram"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></a>
          </div>
        </div>
        <nav class="sf-col" aria-label="Основное">
          <h3><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>Основное</h3>
          <ul>
            <li><a href="${root}index.html">Главная</a></li>
            <li><a href="${root}akcii.html">Акции</a></li>
            <li><a href="${root}rules.html">Правила</a></li>
          </ul>
        </nav>
        <nav class="sf-col" aria-label="Игровое">
          <h3><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10.5v4M5 12.5h4"/><circle cx="16" cy="11.5" r="1" fill="currentColor"/><circle cx="18.5" cy="14" r="1" fill="currentColor"/></svg>Игровое</h3>
          <ul>
            <li><a href="${root}index.html#shop">Магазин</a></li>
            <li><a href="${root}privileges.html">Привилегии</a></li>
            <li><a href="${root}monitoring.html">Мониторинг</a></li>
            <li><a href="${root}passport/">Паспорт игрока</a></li>
            <li><a href="${root}media.html">Стать медиа</a></li>
          </ul>
        </nav>
        <nav class="sf-col" aria-label="Информация">
          <h3><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.8" r="1" fill="currentColor"/></svg>Информация</h3>
          <ul>
            <li><a href="${root}oferta.html">Договор-оферта</a></li>
            <li><a href="${root}agreement.html">Пользовательское соглашение</a></li>
            <li><a href="${root}privacy.html">Политика конфиденциальности</a></li>
            <li><a href="${root}contacts.html">Контакты</a></li>
          </ul>
        </nav>
      </div>
      <div class="sf-bottom">
        <p>WardenSMP<br><a href="mailto:w-smp@outlook.com">w-smp@outlook.com</a></p>
        <p>WardenSMP не связан с Mojang или Microsoft, все средства идут на развитие проекта.</p>
        <p>© 2025–2026 WardenSMP. Все права защищены.</p>
      </div>
    </div>
  </div>
</footer>`;

  const cartHtml = `
<div class="cart-overlay" data-cart-close></div>
<aside class="cart is-empty" id="cart" role="dialog" aria-modal="true" aria-labelledby="cart-title" tabindex="-1">
  <div class="cart-head">
    <div><h2 id="cart-title">Корзина</h2><p id="cart-sub">Пока пусто</p></div>
    <button class="icon-btn" type="button" data-cart-close aria-label="Закрыть корзину">${ic('<path d="M6 6l12 12M18 6L6 18"/>')}</button>
  </div>
  <div class="cart-body">
    <div class="cart-empty">
      <p>В корзине пока ничего нет.</p>
      <a class="btn btn-primary" href="${root}index.html#shop" data-cart-close>Выбрать привилегию</a>
    </div>
    <div class="cart-content">
      <ul class="cart-items" id="cart-items"></ul>
      <section class="cart-box">
        <h3>Кому доставить</h3>
        <div class="fields">
          <label class="field"><span>Ник</span><input id="f-nick" type="text" autocomplete="nickname" maxlength="16" placeholder="Твой ник в игре"></label>
          <label class="field"><span>E-mail</span><input id="f-email" type="email" autocomplete="email" placeholder="name@mail.com"></label>
          <label class="field" id="f-friend-row" hidden><span>Получатель</span><input id="f-friend" type="text" maxlength="16" placeholder="Ник друга"></label>
        </div>
      </section>
      <section class="cart-box cart-gift">
        <span class="gift-label">${ic('<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M8 8a2.5 2.5 0 1 1 0-5c2 0 4 2.5 4 5 0-2.5 2-5 4-5a2.5 2.5 0 1 1 0 5"/>')}Сделать подарком</span>
        <button class="switch" id="f-gift" type="button" role="switch" aria-checked="false" aria-label="Сделать подарком"></button>
      </section>
    </div>
  </div>
  <div class="cart-foot">
    <div class="cart-total"><span>К оплате</span><b id="cart-total">—</b></div>
    <p class="cart-rub" id="cart-rub" hidden></p>
    <label class="terms"><input type="checkbox" id="f-terms"> <span>Принимаю условия <a href="${root}oferta.html" target="_blank" rel="noopener">оферты</a></span></label>
    <button class="btn btn-primary pay" id="cart-pay" type="button" disabled>Перейти к оплате ${ic('<path d="M5 12h14M13 6l6 6-6 6"/>')}</button>
    <p class="cart-hint" id="cart-hint" role="status"></p>
  </div>
</aside>`;

  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.outerHTML = header;
  if (f) f.outerHTML = footer;
  document.body.insertAdjacentHTML("beforeend", cartHtml);

  // ---- Корзина (товары и getCart/setCart/paintCart берутся из main.js) ----
  const $ = (id) => document.getElementById(id);
  const cart = $("cart"), overlay = document.querySelector(".cart-overlay");
  const list = $("cart-items"), sub = $("cart-sub"), totalEl = $("cart-total");
  const nick = $("f-nick"), email = $("f-email"), friend = $("f-friend"), friendRow = $("f-friend-row");
  const giftSw = $("f-gift"), terms = $("f-terms"), pay = $("cart-pay"), hint = $("cart-hint");
  const BUYER_KEY = "wsmp-buyer";

  const money = (n) => WCUR.fmt(n);                          // для показа: в выбранной валюте
  const rub = (n) => n.toLocaleString("ru-RU") + " ₽";        // для оплаты и заказа: всегда в рублях
  const plural = (n) => (n % 10 === 1 && n % 100 !== 11) ? "товар" : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) ? "товара" : "товаров";
  const nickOk = (v) => /^[A-Za-z0-9_]{3,16}$/.test(v.trim());
  const mailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const isGift = () => giftSw.getAttribute("aria-checked") === "true";

  try {
    const saved = JSON.parse(localStorage.getItem(BUYER_KEY)) || {};
    nick.value = saved.nick || "";
    email.value = saved.email || "";
  } catch (e) {}

  const trash = ic('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/>');

  function validate() {
    let msg = "";
    if (!nickOk(nick.value)) msg = "Ник: 3–16 символов, латиница, цифры и _.";
    else if (isGift() && !nickOk(friend.value)) msg = "Ник получателя: 3–16 символов, латиница, цифры и _.";
    else if (!mailOk(email.value)) msg = "Укажи корректный e-mail.";
    else if (!terms.checked) msg = "Прими условия оферты.";
    pay.disabled = Boolean(msg) || getCart().length === 0;
    hint.textContent = msg;
  }

  const cartItems = () => getCart().map(lineOf).filter(Boolean);

  function render() {
    const items = cartItems();
    const total = items.reduce((s, i) => s + i.price, 0);
    cart.classList.toggle("is-empty", items.length === 0);
    sub.textContent = items.length ? `${items.length} ${plural(items.length)} на ${money(total)}` : "Пока пусто";
    totalEl.textContent = items.length ? money(total) : "—";
    const rubEl = $("cart-rub");
    const foreign = items.length > 0 && WCUR.code() !== "RUB";
    rubEl.hidden = !foreign;
    if (foreign) rubEl.textContent = `Оплата в рублях: ${rub(total)}. Другие валюты показаны по ориентировочному курсу.`;
    list.innerHTML = items.map(({ p, label, price }) => `
      <li class="cart-item">
        <span class="cart-thumb">${ICONS[p.icon || "box"]}</span>
        <span class="cart-info"><b>${p.name}</b><small>${label}</small></span>
        <span class="cart-price">${money(price)}</span>
        <button class="icon-btn small" type="button" data-remove="${p.id}" aria-label="Убрать ${p.name}">${trash}</button>
      </li>`).join("");
    validate();
  }

  let lastFocus = null;
  function openCart() {
    lastFocus = document.activeElement;
    render();
    overlay.classList.add("open");
    cart.classList.add("open");
    document.body.classList.add("lock");
    cart.focus();
  }
  function closeCart() {
    overlay.classList.remove("open");
    cart.classList.remove("open");
    document.body.classList.remove("lock");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-cart-open]")) return openCart();
    if (e.target.closest("[data-cart-close]")) return closeCart();
    const rm = e.target.closest("[data-remove]");
    if (rm) {
      setCart(getCart().filter((x) => x.id !== rm.dataset.remove));
      paintCart();
      return render();
    }
    if (e.target.closest(".add") && cart.classList.contains("open")) render();
  });

  document.addEventListener("cart:open", openCart);

  document.addEventListener("keydown", (e) => {
    if (!cart.classList.contains("open")) return;
    if (e.key === "Escape") return closeCart();
    if (e.key !== "Tab") return;
    const f = [...cart.querySelectorAll("button:not(:disabled), a[href], input")].filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === cart)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  giftSw.addEventListener("click", () => {
    const on = !isGift();
    giftSw.setAttribute("aria-checked", String(on));
    friendRow.hidden = !on;
    validate();
  });
  [nick, email, friend].forEach((el) => el.addEventListener("input", () => {
    try { localStorage.setItem(BUYER_KEY, JSON.stringify({ nick: nick.value.trim(), email: email.value.trim() })); } catch (e) {}
    validate();
  }));
  terms.addEventListener("change", validate);
  document.addEventListener("currency:change", render);

// Оплата через RollyPay
pay.addEventListener("click", async () => {
  if (pay.dataset.busy === "1") return;

  validate();
  if (pay.disabled) return;

  const playerName = nick.value.trim();
  const buyerEmail = email.value.trim();
  const gift = isGift();
  const giftName = gift ? friend.value.trim() : "";

  let items;

  try {
    items = getCart().map((entry) => {
      if (!entry || typeof entry.id !== "string") {
        throw new Error("Некорректный товар в корзине.");
      }

      const item = { id: entry.id };

      if (Number.isInteger(entry.term)) {
        item.term = entry.term;
      }

      if (entry.id === "title") {
        item.text = entry.text;
        item.mode = entry.mode;
        item.c1 = entry.c1;
        item.c2 = entry.c2;
      }

      if (entry.id === "varda") {
        item.rub = Number(entry.rub);
      }

      return item;
    });

    if (items.length === 0) {
      hint.textContent = "Корзина пуста.";
      return;
    }
  } catch (error) {
    hint.textContent =
      error.message || "Не удалось прочитать корзину.";
    return;
  }

  const originalHtml = pay.innerHTML;

  pay.disabled = true;
  pay.dataset.busy = "1";
  pay.textContent = "Создаём платёж...";
  hint.textContent = "Подключаемся к RollyPay...";

  try {
    const response = await fetch(
      "https://rollypay-api.wsmp.workers.dev/api/create-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          player_name: playerName,
          email: buyerEmail,
          is_gift: gift,
          gift_name: giftName,
          accept_terms: terms.checked,
          items: items
        })
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.ok || !data.pay_url) {
      throw new Error(
        data.error || `Не удалось создать платёж (${response.status}).`
      );
    }

    const paymentUrl = new URL(data.pay_url);

    if (
      paymentUrl.protocol !== "https:" ||
      paymentUrl.hostname !== "pay.rollypay.io"
    ) {
      throw new Error("Получена некорректная ссылка на оплату.");
    }

    hint.textContent = "Перенаправляем на оплату...";
    window.location.assign(paymentUrl.href);

  } catch (error) {
    hint.textContent =
      error.message || "Ошибка подключения к RollyPay.";

    pay.disabled = false;
    delete pay.dataset.busy;
    pay.innerHTML = originalHtml;

    validate();
  }
});
})();

// Плашка «Паспорт»: если игрок уже входил, показываем его ник и ведём на его паспорт
(function () {
  const a = document.getElementById("pass-btn");
  if (!a) return;
  try {
    const me = JSON.parse(localStorage.getItem("wsmp-me") || "null");
    if (me && typeof me.name === "string" && /^[.A-Za-z0-9_]{1,17}$/.test(me.name)) {
      a.querySelector(".pass-txt").textContent = me.name;
      a.href = (document.body.dataset.root || "") + "passport/?nick=" + encodeURIComponent(me.name);
    }
  } catch (e) { /* хранилище недоступно */ }
})();

// Выбор валюты в шапке
(function () {
  const box = document.getElementById("cur");
  if (!box) return;
  const btn = box.querySelector(".cur-btn"), sym = document.getElementById("cur-sym");
  const setOpen = (on) => { box.classList.toggle("open", on); btn.setAttribute("aria-expanded", String(on)); };
  const paint = () => {
    sym.textContent = WCUR.cur().sym;
    box.querySelectorAll(".cur-opt").forEach((o) => o.setAttribute("aria-pressed", String(o.dataset.cur === WCUR.code())));
  };
  btn.addEventListener("click", () => setOpen(!box.classList.contains("open")));
  box.querySelectorAll(".cur-opt").forEach((o) => o.addEventListener("click", () => { WCUR.set(o.dataset.cur); paint(); setOpen(false); }));
  document.addEventListener("click", (e) => { if (!box.contains(e.target)) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && box.classList.contains("open")) { setOpen(false); btn.focus(); } });
  document.addEventListener("currency:change", paint);
})();

// Плавный уход со страницы: контент гаснет, потом открывается следующая страница (она сама плавно появляется)
(function () {
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // при возврате кнопкой «Назад» страница может прийти из кеша уже «погасшей»
  window.addEventListener("pageshow", () => document.body.classList.remove("leaving"));
  if (reduce) return;
  document.addEventListener("click", (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest("a[href]");
    if (!a || a.target === "_blank" || a.hasAttribute("download") || a.closest("[data-open]")) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;                                   // внешние ссылки и mailto
    if (url.pathname === location.pathname && url.search === location.search) return; // якорь на этой же странице
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => { location.href = a.href; }, 220);
  });
})();
