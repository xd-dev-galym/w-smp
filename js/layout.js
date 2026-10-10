// Общая шапка, подвал и окно корзины для всех страниц. Меняешь здесь, меняется везде.
// На странице нужен <body data-root="" data-page="..."> (в папке privilege/: data-root="../").
(function () {
  const root = document.body.dataset.root || "";
  const page = document.body.dataset.page || "";
  const ic = (d) => `<svg class="ic" viewBox="0 0 24 24">${d}</svg>`;

  const links = [
    ["privileges", "privileges.html", "Привилегии", ic('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>')],
    ["rules", "rules.html", "Правила", ic('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>')],
    ["media", "media.html", "Стать медиа", ic('<path d="M3 7h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3z"/><path d="M17 11l4-2v6l-4-2"/>')],
    ["contacts", "contacts.html", "Контакты", ic('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>')],
  ];
  const navHtml = links.map(([key, href, label, icon]) =>
    `<a href="${root}${href}"${key === page ? ' aria-current="page"' : ""}><span class="ico">${icon}</span>${label}</a>`).join("");

  const header = `
<div class="island-wrap">
  <div class="wrap">
    <header class="island">
      <a class="logo" href="${root}index.html">Warden<span>SMP</span></a>
      <div class="online"><div><b data-online>—</b><small>игроков онлайн</small></div></div>
      <nav class="nav" id="nav">${navHtml}</nav>
      <div class="island-actions">
        <button class="icon-btn" type="button" data-cart-open aria-haspopup="dialog" aria-label="Корзина">
          ${ic('<path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.2a1 1 0 0 0 1-.8L19 8H6"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>')}
          <span class="badge"></span>
        </button>
        <button class="icon-btn nav-toggle" type="button" aria-expanded="false" aria-controls="nav" aria-label="Меню">
          ${ic('<path d="M4 7h16M4 12h16M4 17h16"/>')}
        </button>
      </div>
    </header>
  </div>
</div>`;

  const footer = `
<footer class="site-footer">
  <div class="wrap foot">
    <div class="foot-brand">
      <a class="logo" href="${root}index.html">Warden<span>SMP</span></a>
      <p>© 2025-2026 все права защищены</p>
      <p>WardenSMP не связан с Mojang или Microsoft, все средства идут на развитие проекта.</p>
    </div>
    <div>
      <h3>Мы в соц. сетях</h3>
      <ul>
        <li><a href="https://discord.gg/DGthvPcgk8" target="_blank" rel="noopener">Discord</a></li>
        <li><a href="https://t.me/w_smp" target="_blank" rel="noopener">Telegram</a></li>
        <li><a href="https://vk.ru/w_smp" target="_blank" rel="noopener">VK</a></li>
      </ul>
    </div>
    <div>
      <h3>Информация</h3>
      <ul>
        <li><a href="${root}rules.html">Правила</a></li>
        <li><a href="${root}media.html">Стать медиа</a></li>
        <li><a href="${root}contacts.html">Контакты</a></li>
      </ul>
    </div>
    <div>
      <h3>Юридическая информация</h3>
      <ul>
        <li><a href="${root}oferta.html">Договор-оферта</a></li>
        <li><a href="${root}agreement.html">Пользовательское соглашение</a></li>
      </ul>
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
    <div class="cart-total"><span>К оплате</span><b id="cart-total">— ₽</b></div>
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

  const money = (n) => n.toLocaleString("ru-RU") + " ₽";
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
    totalEl.textContent = items.length ? money(total) : "— ₽";
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

  // Пока оплата идёт через бота поддержки: заказ копируется и открывается чат с ботом.
  // Когда подключишь платёжную систему, замени содержимое этого обработчика на переход к оплате.
  const SUPPORT_BOT = "https://t.me/w_smp_bot";
  pay.addEventListener("click", () => {
    const items = cartItems();
    const total = items.reduce((s, i) => s + i.price, 0);
    const lines = ["Заказ WardenSMP", `Ник: ${nick.value.trim()}`, `E-mail: ${email.value.trim()}`];
    if (isGift()) lines.push(`Подарок для: ${friend.value.trim()}`);
    lines.push("Товары:");
    items.forEach(({ p, label, price }) => lines.push(`• ${p.name} — ${label} — ${money(price)}`));
    lines.push(`Итого: ${money(total)}`);
    const text = lines.join("\n");

    const copied = navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject();
    window.open(SUPPORT_BOT, "_blank", "noopener");
    copied
      .then(() => { hint.textContent = "Заказ скопирован. Вставь его в чат с ботом поддержки и отправь."; })
      .catch(() => { hint.textContent = "Не удалось скопировать заказ. Отправь его боту вручную:\n" + text; });
  });
})();
