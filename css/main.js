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
];

// Корзина (хранится в браузере): [{ id: "voin", term: 0 }]
const CART_KEY = "wsmp-cart-v2";
const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } };
const setCart = (c) => { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {} };
const badge = document.querySelector(".badge");
function paintCart() {
  const n = getCart().length;
  if (badge) { badge.textContent = n; badge.classList.toggle("on", n > 0); }
}
const money = (n) => n.toLocaleString("ru-RU") + " ₽";
const BOX_ICON = '<svg class="ic" viewBox="0 0 24 24"><path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>';

// Карточки товаров на странице
const grid = document.getElementById("products");
if (grid) {
  grid.innerHTML = PRODUCTS.map((p) => `
    <article class="card">
      <button class="card-img" type="button" data-open="${p.id}" aria-label="${p.name}: выбрать вариант">${BOX_ICON}</button>
      <div class="card-body">
        <span class="card-cat">Привилегии</span>
        <button class="card-name" type="button" data-open="${p.id}">${p.name}</button>
        <span class="card-price">от ${money(Math.min(...p.prices))}</span>
        <button class="add" type="button" data-open="${p.id}">Выбрать вариант</button>
      </div>
    </article>`).join("");
}
paintCart();

// Возможности привилегии: commands = [["описание", "/команда"]], perks = [["название", "значение"]]
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function featHtml(p) {
  const f = p.features;
  if (!f) return "";
  const block = (title, rows) => rows && rows.length ? `<section><h3>${title}</h3><ul class="feat-list">${rows.join("")}</ul></section>` : "";
  return block("Команды", (f.commands || []).map(([t, c]) => `<li>${esc(t)} — <code>${esc(c)}</code></li>`))
       + block("Возможности", (f.perks || []).map(([l, v]) => `<li>${esc(l)}${v ? `: <b>${esc(v)}</b>` : ""}</li>`));
}

// Окно товара: картинка, срок, цена, кнопка «В корзину»
let pm = null;
function buildPm() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="cart-overlay" id="pm-overlay" data-pm-close></div>
    <div class="pm" id="pm" role="dialog" aria-modal="true" aria-labelledby="pm-name">
      <button class="icon-btn pm-x" type="button" data-pm-close aria-label="Закрыть">
        <svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <div class="pm-img">${BOX_ICON}</div>
      <div class="pm-info">
        <span class="card-cat">Привилегии</span>
        <h2 id="pm-name"></h2>
        <div class="pm-feat" id="pm-feat"></div>
        <div class="pm-terms" id="pm-terms" role="group" aria-label="Срок привилегии"></div>
        <div class="pm-buy">
          <span class="pm-price" id="pm-price"></span>
          <button class="btn btn-primary" id="pm-add" type="button">В корзину</button>
        </div>
      </div>
    </div>`);
  pm = {
    overlay: document.getElementById("pm-overlay"), el: document.getElementById("pm"),
    name: document.getElementById("pm-name"), feat: document.getElementById("pm-feat"), terms: document.getElementById("pm-terms"),
    price: document.getElementById("pm-price"), add: document.getElementById("pm-add"),
    id: null, term: 0, last: null,
  };
}
function paintPm() {
  const p = PRODUCTS.find((x) => x.id === pm.id);
  const entry = getCart().find((x) => x.id === pm.id);
  pm.terms.innerHTML = TERMS.map((t, i) =>
    `<button class="pm-term" type="button" data-term="${i}" aria-pressed="${i === pm.term}"><span>${t.full}</span><b>${money(p.prices[i])}</b></button>`).join("");
  pm.price.textContent = money(p.prices[pm.term]);
  pm.add.textContent = !entry ? "В корзину" : entry.term === pm.term ? "Открыть корзину" : "Изменить срок";
}
function openProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  if (!pm) buildPm();
  const entry = getCart().find((x) => x.id === id);
  pm.id = id;
  pm.term = entry ? entry.term : 0;
  pm.name.textContent = p.name;
  pm.feat.innerHTML = featHtml(p);
  pm.last = document.activeElement;
  paintPm();
  pm.overlay.classList.add("open");
  pm.el.classList.add("open");
  document.body.classList.add("lock");
  pm.el.querySelector(".pm-x").focus();
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
  if (open) return openProduct(open.dataset.open);
  if (!pm) return;
  if (e.target.closest("[data-pm-close]")) return closeProduct();
  const term = e.target.closest(".pm-term");
  if (term) { pm.term = Number(term.dataset.term); return paintPm(); }
  if (e.target.closest("#pm-add")) {
    const entry = getCart().find((x) => x.id === pm.id);
    if (!entry || entry.term !== pm.term) {
      const cart = getCart().filter((x) => x.id !== pm.id);
      cart.push({ id: pm.id, term: pm.term });
      setCart(cart);
      paintCart();
    }
    closeProduct();
    document.dispatchEvent(new Event("cart:open"));
  }
});
document.addEventListener("keydown", (e) => {
  if (!pm || !pm.el.classList.contains("open")) return;
  if (e.key === "Escape") return closeProduct();
  if (e.key !== "Tab") return;
  const f = [...pm.el.querySelectorAll("button:not(:disabled)")];
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
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
