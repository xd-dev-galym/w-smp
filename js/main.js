// Сроки привилегий: порядок совпадает с порядком цен в prices: [1 месяц, 3 месяца, навсегда]
const TERMS = [
  { label: "1 мес", full: "1 месяц" },
  { label: "3 мес", full: "3 месяца" },
  { label: "Навсегда", full: "Навсегда" },
];

// Товары: порядок сверху вниз, от Спонсора к Воину. Цены меняй в prices.
const PRODUCTS = [
  { id: "sponsor", name: "Спонсор", prices: [599, 649, 699],
    features: {
      commands: [["Просмотр инвентаря игрока", "/invsee <Ник>"], ["Снять бан с игрока", "/unban <Ник>"], ["Выдать бан игроку (до 1 часа)", "/ban <Ник>"]],
      perks: [["Макс кол-во домов", "10"], ["Слотов на аукционе", "20"], ["Радиус неара", "300"], ["Кулдаун перед телепортом", "0 сек"]],
    } },
  { id: "eternity", name: "Eternity", prices: [479, 529, 579],
    features: {
      commands: [["Объявление на сервер", "/broadcast"], ["Снять мут с игрока", "/unmute <Ник>"], ["Выдать мут игроку (до 1 часа)", "/amute <Ник>"]],
      perks: [["Макс кол-во домов", "9"], ["Слотов на аукционе", "19"], ["Радиус неара", "250"], ["Кулдаун перед телепортом", "1 сек"], ["Зачёркнутый текст в чате"]],
    } },
  { id: "stinger", name: "Stinger", prices: [419, 459, 499],
    features: {
      perks: [["Макс кол-во домов", "9"], ["Слотов на аукционе", "18"], ["Радиус неара", "240"], ["Кулдаун перед телепортом", "1 сек"], ["Жирный текст в чате"], ["Подчёркнутый текст в чате"]],
    } },
  { id: "dragon", name: "Dragon", prices: [349, 389, 429],
    features: {
      perks: [["Макс кол-во домов", "8"], ["Слотов на аукционе", "16"], ["Радиус неара", "220"], ["Кулдаун перед телепортом", "2 сек"], ["Цветной текст в чате"]],
    } },
  { id: "avenger", name: "Avenger", prices: [319, 359, 399],
    features: {
      commands: [["Вылечить игрока", "/heal <Ник>"], ["Накормить игрока", "/feed <Ник>"]],
      perks: [["Макс кол-во домов", "7"], ["Слотов на аукционе", "15"], ["Радиус неара", "200"], ["Кулдаун перед телепортом", "2 сек"]],
    } },
  { id: "legend", name: "Legend", prices: [269, 309, 349],
    features: {
      commands: [["Личное время", "/ptime"], ["Личная погода", "/pweather"]],
      perks: [["Макс кол-во домов", "6"], ["Слотов на аукционе", "14"], ["Радиус неара", "180"], ["Кулдаун перед телепортом", "3 сек"]],
    } },
  { id: "phantom", name: "Phantom", prices: [229, 269, 309],
    features: {
      commands: [["Открыть Эндер сундук", "/enderchest"], ["Встать в режим АФК", "/afk"]],
      perks: [["Макс кол-во домов", "6"], ["Слотов на аукционе", "13"], ["Радиус неара", "160"], ["Кулдаун перед телепортом", "3 сек"]],
    } },
  { id: "master", name: "Master", prices: [179, 219, 259],
    features: {
      commands: [["Потушить себя", "/ext"], ["Открыть виртуальную наковальню", "/anvil"], ["Переключить режим ЛС", "/msgtoggle"]],
      perks: [["Макс кол-во домов", "5"], ["Слотов на аукционе", "11"], ["Радиус неара", "150"], ["Кулдаун перед телепортом", "4 сек"]],
    } },
  { id: "ghost", name: "Ghost", prices: [129, 169, 209],
    features: {
      commands: [["Телепортироваться вверх", "/top"], ["Открыть кузнечный стол", "/smithtable"], ["Открыть точильный камень", "/grindstone"]],
      perks: [["Макс кол-во домов", "4"], ["Слотов на аукционе", "10"], ["Радиус неара", "140"], ["Кулдаун перед телепортом", "4 сек"]],
    } },
  { id: "paladin", name: "Паладин", prices: [99, 139, 179],
    features: {
      commands: [["Открыть ткацкий станок", "/loom"], ["Открыть стол картографа", "/carttable"], ["Открыть камнерез", "/stonecutter"]],
      perks: [["Макс кол-во домов", "3"], ["Слотов на аукционе", "9"], ["Радиус неара", "130"], ["Кулдаун перед телепортом", "5 сек"]],
    } },
  { id: "geroy", name: "Герой", prices: [79, 119, 159],
    features: {
      commands: [["Показать глубину/Y-координату", "/depth"], ["Восстановить здоровье", "/heal"], ["Восстановить голод", "/feed"]],
      perks: [["Макс кол-во домов", "3"], ["Слотов на аукционе", "8"], ["Радиус неара", "120"], ["Кулдаун перед телепортом", "5 сек"]],
    } },
  { id: "lord", name: "Лорд", prices: [49, 69, 99],
    features: {
      commands: [["Очистить инвентарь", "/clear"], ["Игнорировать игрока", "/ignore"]],
      perks: [["Точек дома", "2"], ["Слотов на аукционе", "7"], ["Радиус неара", "100"], ["Кулдаун перед телепортом", "6 сек"]],
    } },
  { id: "voin", name: "Воин", prices: [19, 39, 59],
    features: {
      commands: [["Открыть виртуальный верстак", "/workbench"], ["Надеть предмет на голову", "/hat"]],
      perks: [["Точек дома", "2"], ["Слотов на аукционе", "5"], ["Радиус неара", "90"], ["Кулдаун перед телепортом", "6 сек"]],
    } },
  // Категория «Другое»
  { id: "unmute", name: "Размут", cat: "other", type: "item", price: 49,
    about: ["Получите размут моментально!"] },
  { id: "unban", name: "Разбан", cat: "other", type: "item", price: 139,
    about: [
      "Получите разбан моментально!",
      "Разбан получает ИСКЛЮЧИТЕЛЬНО 1 АККАУНТ",
      "Для каждого забаненного аккаунта, вы должны купить отдельный разбан иначе вы получите повторный бан за «обход блокировки»",
    ],
    warn: "ВНИМАНИЕ! ЕСЛИ ВЫ ЯВЛЯЕТЕСЬ ЧСП ТО ВЫ НЕ ПОЛУЧИТЕ РАЗБАН!" },
  { id: "varda", name: "Варды", cat: "varda", type: "currency", icon: "coin" },
];

// Корзина (хранится в браузере). Записи: привилегия { id, term }, услуга { id }, валюта { id, rub }
const CART_KEY = "wsmp-cart-v2";
const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } };
const setCart = (c) => { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {} };
const badge = document.querySelector(".badge");
function paintCart() {
  const all = getCart(), cart = all.filter((e) => lineOf(e));
  if (cart.length !== all.length) setCart(cart); // убираем устаревшие записи
  const n = cart.length;
  if (badge) { badge.textContent = n; badge.classList.toggle("on", n > 0); }
}
const money = (n) => n.toLocaleString("ru-RU") + " ₽";
const fmtNum = (n) => n.toLocaleString("ru-RU");
const ICONS = {
  box: '<svg class="ic" viewBox="0 0 24 24"><path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  coin: '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8.5 9l3.5 7 3.5-7"/></svg>',
};

// Категории товаров (порядок кнопок)
const CATS = [
  { id: "all", label: "Все" },
  { id: "priv", label: "Привилегии" },
  { id: "varda", label: "Варды" },
  { id: "other", label: "Другое" },
];

// Варды: perRub = сколько Вард дают за 1 ₽ (сейчас 1 ₽ = 1 Варда). min/max = сумма покупки в рублях.
// tiers = скидка за объём на цену: [от скольки ₽, скидка %]. Скидка небольшая, максимум 10%.
const VARDA = { min: 10, max: 10000, perRub: 1, presets: [100, 500, 1000, 2500, 5000], tiers: [[500, 2], [1000, 4], [2500, 6], [5000, 8], [10000, 10]] };
const typeOf = (p) => p.type || "priv";
const clampRub = (n) => Math.min(VARDA.max, Math.max(VARDA.min, Math.round(Number(n)) || VARDA.min));
const vardsFor = (rub) => Math.round(rub * VARDA.perRub);
const discountFor = (rub) => VARDA.tiers.reduce((d, [from, pct]) => (rub >= from ? pct : d), 0);
const payFor = (rub) => Math.round((rub * (100 - discountFor(rub))) / 100);
// «1 вард, 2 варда, 5 вардов»
const vardWord = (n) => { const a = n % 100, b = n % 10; return a >= 11 && a <= 14 ? "вардов" : b === 1 ? "вард" : b >= 2 && b <= 4 ? "варда" : "вардов"; };
const vardsText = (n) => `${fmtNum(n)} ${vardWord(n)}`;
// Положение ползунка (0..1000) в логарифмической шкале: так удобно выбирать и 10 ₽, и 10 000 ₽
const posOf = (v) => Math.round((Math.log(v / VARDA.min) / Math.log(VARDA.max / VARDA.min)) * 1000);
function rubOf(pos) {
  const raw = VARDA.min * Math.pow(VARDA.max / VARDA.min, pos / 1000);
  const step = Math.pow(10, Math.max(Math.floor(Math.log10(raw)) - 1, 0));
  return clampRub(Math.round(raw / step) * step);
}

// Строка корзины: товар, цена и подпись (используется в корзине в layout.js)
function lineOf(e) {
  const p = PRODUCTS.find((x) => x.id === e.id);
  if (!p) return null;
  const t = typeOf(p);
  if (t === "priv") return TERMS[e.term] ? { p, price: p.prices[e.term], label: TERMS[e.term].full } : null;
  if (t === "item") return { p, price: p.price, label: "Разовая услуга" };
  if (e.rub == null) return null;
  const rub = clampRub(e.rub);
  const d = discountFor(rub);
  return { p, price: payFor(rub), label: vardsText(vardsFor(rub)) + (d ? ` · скидка ${d}%` : "") };
}

// ---- Каталог: карточки и категории ----
const grid = document.getElementById("products");
let activeCat = "all";
let vdRub = 100;
function cardPrice(p) {
  const t = typeOf(p);
  if (t === "item") return money(p.price);
  if (t === "currency") return "от " + money(VARDA.min);
  return "от " + money(Math.min(...p.prices));
}
// Категория «Варды»: вместо карточек одна панель с ползунком
function vardaPanel() {
  return `
    <section class="vd-panel">
      <div class="vd-disc">
        <div class="vd-disc-head">
          <p class="vd-box-title">Скидка за объём</p>
          <span class="vd-disc-hint">Чем больше сумма, тем больше скидка</span>
        </div>
        <div class="vd-tiers" id="vd-tiers"></div>
      </div>
      <div class="vd-buy">
        <div class="vd-form">
          <div class="vd-head">
            <span class="vd-coin">${ICONS.coin}</span>
            <div>
              <h2>Варды</h2>
              <p class="vd-lead">1 ₽ = ${vardsText(VARDA.perRub)}. Сумма от ${fmtNum(VARDA.min)} до ${fmtNum(VARDA.max)} ₽.</p>
            </div>
          </div>
          <label class="vd-field"><span>Сумма</span><input id="vd-num" type="number" inputmode="numeric" min="${VARDA.min}" max="${VARDA.max}" step="1"><b>₽</b></label>
          <div>
            <input id="vd-range" class="vd-range" type="range" min="0" max="1000" step="1" aria-label="Сумма в рублях">
            <div class="vd-scale"><span>${fmtNum(VARDA.min)} ₽</span><span>${fmtNum(VARDA.max)} ₽</span></div>
          </div>
          <div class="vd-presets">${VARDA.presets.map((n) => `<button type="button" data-rub="${n}" aria-pressed="false">${fmtNum(n)} ₽</button>`).join("")}</div>
        </div>
        <div class="vd-sum">
          <div class="vd-row"><span>Вы получите</span><p class="vd-get" id="vd-get"></p></div>
          <div class="vd-row"><span>К оплате</span><b class="vd-price" id="vd-price"></b><p class="vd-sale" id="vd-sale"></p></div>
          <button class="btn btn-primary" id="vd-add" type="button">В корзину</button>
        </div>
      </div>
    </section>`;
}
function paintVarda() {
  const num = document.getElementById("vd-num");
  if (!num) return;
  const range = document.getElementById("vd-range");
  if (document.activeElement !== num) num.value = vdRub;
  range.value = posOf(vdRub);
  range.style.setProperty("--p", range.value / 10 + "%");
  document.querySelectorAll(".vd-presets button").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.rub) === vdRub)));
  const d = discountFor(vdRub);
  document.getElementById("vd-get").textContent = vardsText(vardsFor(vdRub));
  document.getElementById("vd-price").textContent = money(payFor(vdRub));
  document.getElementById("vd-sale").textContent = d ? `Скидка за объём: ${d}%` : "";
  const check = '<svg class="ic" viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg>';
  document.getElementById("vd-tiers").innerHTML = VARDA.tiers.map(([from, pct]) => vdRub >= from
    ? `<div class="vd-tier on"><span class="vd-pct">−${pct}%</span><span class="vd-from">от ${fmtNum(from)} ₽</span>${check}</div>`
    : `<div class="vd-tier"><span class="vd-pct">−${pct}%</span><span class="vd-from">от ${fmtNum(from)} ₽</span><span class="vd-need">+${fmtNum(from - vdRub)}</span></div>`).join("");
  const entry = getCart().find((x) => x.id === "varda");
  document.getElementById("vd-add").textContent = !entry ? "В корзину" : entry.rub === vdRub ? "Открыть корзину" : "Изменить сумму";
}
function renderGrid() {
  if (!grid) return;
  if (activeCat === "varda") {
    const entry = getCart().find((x) => x.id === "varda");
    if (entry && entry.rub) vdRub = clampRub(entry.rub);
    grid.innerHTML = vardaPanel();
    return paintVarda();
  }
  grid.innerHTML = PRODUCTS.filter((p) => activeCat === "all" || (p.cat || "priv") === activeCat).map((p) => `
    <article class="card">
      <button class="card-img" type="button" data-open="${p.id}" aria-label="${p.name}: выбрать вариант">${ICONS[p.icon || "box"]}</button>
      <div class="card-body">
        <span class="card-cat">${CATS.find((c) => c.id === (p.cat || "priv")).label}</span>
        <button class="card-name" type="button" data-open="${p.id}">${p.name}</button>
        <span class="card-price">${cardPrice(p)}</span>
        <button class="add" type="button" data-open="${p.id}">Выбрать вариант</button>
      </div>
    </article>`).join("");
}
function setCat(id) {
  activeCat = id;
  document.querySelectorAll(".cat[data-cat]").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.cat === id)));
  renderGrid();
}
renderGrid();
document.querySelectorAll(".cat[data-cat]").forEach((b) => b.addEventListener("click", () => setCat(b.dataset.cat)));
paintCart();

// Возможности привилегии: commands = [["описание", "/команда"]], perks = [["название", "значение"]]
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function featHtml(p) {
  const about = (p.about || []).map((t) => `<p class="pm-about">${esc(t)}</p>`).join("");
  const warn = p.warn ? `<p class="pm-warn">${esc(p.warn)}</p>` : "";
  const f = p.features;
  if (!f) return about + warn;
  const block = (title, rows) => rows && rows.length ? `<section><h3>${title}</h3><ul class="feat-list">${rows.join("")}</ul></section>` : "";
  return about + warn
       + block("Команды", (f.commands || []).map(([t, c]) => `<li>${esc(t)} — <code>${esc(c)}</code></li>`))
       + block("Возможности", (f.perks || []).map(([l, v]) => `<li>${esc(l)}${v ? `: <b>${esc(v)}</b>` : ""}</li>`));
}

// ---- Окно товара (привилегии со сроком и разовые услуги) ----
let pm = null;
function buildPm() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="cart-overlay" id="pm-overlay" data-pm-close></div>
    <div class="pm" id="pm" role="dialog" aria-modal="true" aria-labelledby="pm-name" tabindex="-1">
      <button class="icon-btn pm-x" type="button" data-pm-close aria-label="Закрыть">
        <svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <div class="pm-img" id="pm-img"></div>
      <div class="pm-info">
        <span class="card-cat" id="pm-cat"></span>
        <h2 id="pm-name"></h2>
        <div class="pm-feat" id="pm-feat"></div>
        <div class="pm-terms" id="pm-terms" role="group" aria-label="Срок привилегии"></div>
        <div class="pm-buy">
          <span class="pm-price" id="pm-price"></span>
          <button class="btn btn-primary" id="pm-add" type="button">В корзину</button>
        </div>
      </div>
    </div>`);
  const g = (id) => document.getElementById(id);
  pm = { overlay: g("pm-overlay"), el: g("pm"), img: g("pm-img"), cat: g("pm-cat"), name: g("pm-name"), feat: g("pm-feat"),
         terms: g("pm-terms"), price: g("pm-price"), add: g("pm-add"), id: null, type: "priv", term: 0, next: null, last: null };
}
function paintPm() {
  const p = PRODUCTS.find((x) => x.id === pm.id);
  const entry = getCart().find((x) => x.id === pm.id);
  let price, next;
  if (pm.type === "priv") {
    pm.terms.innerHTML = TERMS.map((t, i) =>
      `<button class="pm-term" type="button" data-term="${i}" aria-pressed="${i === pm.term}"><span>${t.full}</span><b>${money(p.prices[i])}</b></button>`).join("");
    price = p.prices[pm.term];
    next = { id: pm.id, term: pm.term };
  } else {
    pm.terms.innerHTML = "";
    price = p.price;
    next = { id: pm.id };
  }
  pm.next = next;
  pm.price.textContent = money(price);
  const same = entry && JSON.stringify(entry) === JSON.stringify(next);
  pm.add.textContent = !entry ? "В корзину" : same ? "Открыть корзину" : "Изменить срок";
}
function openProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  if (!pm) buildPm();
  const entry = getCart().find((x) => x.id === id);
  pm.id = id;
  pm.type = typeOf(p);
  pm.term = entry && entry.term != null ? entry.term : 0;
  pm.name.textContent = p.name;
  pm.cat.textContent = CATS.find((c) => c.id === (p.cat || "priv")).label;
  pm.img.innerHTML = ICONS[p.icon || "box"];
  pm.feat.innerHTML = featHtml(p);
  pm.last = document.activeElement;
  paintPm();
  pm.overlay.classList.add("open");
  pm.el.classList.add("open");
  document.body.classList.add("lock");
  pm.el.focus();
}
function closeProduct() {
  if (!pm) return;
  pm.overlay.classList.remove("open");
  pm.el.classList.remove("open");
  document.body.classList.remove("lock");
  if (pm.last && pm.last.focus) pm.last.focus();
}

document.addEventListener("click", (e) => {
  const open = e.target.closest("[data-open]");
  if (open) {
    e.preventDefault();
    const p = PRODUCTS.find((x) => x.id === open.dataset.open);
    // Варды открываются не в окне, а в своей категории с ползунком
    if (p && typeOf(p) === "currency" && grid) { setCat("varda"); return grid.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
    return openProduct(open.dataset.open);
  }
  const rubBtn = e.target.closest("[data-rub]");
  if (rubBtn) { vdRub = clampRub(rubBtn.dataset.rub); document.getElementById("vd-num").value = vdRub; return paintVarda(); }
  if (e.target.closest("#vd-add")) {
    const next = { id: "varda", rub: vdRub };
    const entry = getCart().find((x) => x.id === "varda");
    if (!entry || JSON.stringify(entry) !== JSON.stringify(next)) {
      setCart(getCart().filter((x) => x.id !== "varda").concat(next));
      paintCart();
      paintVarda();
    }
    return document.dispatchEvent(new Event("cart:open"));
  }
  if (!pm) return;
  if (e.target.closest("[data-pm-close]")) return closeProduct();
  const term = e.target.closest(".pm-term");
  if (term) { pm.term = Number(term.dataset.term); return paintPm(); }
  if (e.target.closest("#pm-add")) {
    const entry = getCart().find((x) => x.id === pm.id);
    if (!entry || JSON.stringify(entry) !== JSON.stringify(pm.next)) {
      const cart = getCart().filter((x) => x.id !== pm.id);
      cart.push(pm.next);
      setCart(cart);
      paintCart();
    }
    closeProduct();
    document.dispatchEvent(new Event("cart:open"));
  }
});
document.addEventListener("input", (e) => {
  if (e.target.id === "vd-num") { vdRub = clampRub(e.target.value); paintVarda(); }
  else if (e.target.id === "vd-range") { vdRub = rubOf(Number(e.target.value)); document.getElementById("vd-num").value = vdRub; paintVarda(); }
});
document.addEventListener("change", (e) => {
  if (e.target.id === "vd-num") e.target.value = vdRub;
});
document.addEventListener("keydown", (e) => {
  if (!pm || !pm.el.classList.contains("open")) return;
  if (e.key === "Escape") return closeProduct();
  if (e.key !== "Tab") return;
  const f = [...pm.el.querySelectorAll("button:not(:disabled)")];
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && (document.activeElement === first || document.activeElement === pm.el)) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

// Копирование IP
document.querySelectorAll("[data-copy]").forEach((btn) => {
  const t = btn.querySelector(".t");
  const original = t.textContent;
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(btn.dataset.copy); t.textContent = "Скопировано"; }
    catch (e) { t.textContent = "Скопируй вручную"; }
    setTimeout(() => (t.textContent = original), 1800);
  });
});

// Игроков онлайн
const online = document.querySelector("[data-online]");
if (online) {
  fetch("https://api.mcsrvstat.us/3/mc.w-smp.in")
    .then((r) => r.json())
    .then((d) => { if (d.online && d.players) online.textContent = d.players.online + "/" + d.players.max; })
    .catch(() => {});
}

// Мобильное меню
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}
