// Сроки привилегий: порядок совпадает с порядком цен в prices: [1 месяц, 3 месяца, навсегда]
const TERMS = [
  { label: "1 мес", full: "1 месяц" },
  { label: "3 мес", full: "3 месяца" },
  { label: "Навсегда", full: "Навсегда" },
];

// Товары: порядок сверху вниз, от Спонсора к Воину. Цены меняй в prices.
const PRODUCTS = [
  { id: "sponsor", name: "Спонсор", prices: [599, 649, 699] },
  { id: "eternity", name: "Eternity", prices: [479, 529, 579] },
  { id: "stinger", name: "Stinger", prices: [419, 459, 499] },
  { id: "dragon", name: "Dragon", prices: [349, 389, 429] },
  { id: "avenger", name: "Avenger", prices: [319, 359, 399] },
  { id: "legend", name: "Legend", prices: [269, 309, 349] },
  { id: "phantom", name: "Phantom", prices: [229, 269, 309] },
  { id: "master", name: "Master", prices: [179, 219, 259] },
  { id: "ghost", name: "Ghost", prices: [129, 169, 209] },
  { id: "paladin", name: "Паладин", prices: [99, 139, 179] },
  { id: "geroy", name: "Герой", prices: [79, 119, 159] },
  { id: "lord", name: "Лорд", prices: [49, 69, 99] },
  { id: "voin", name: "Воин", prices: [19, 39, 59] },
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
        <div class="pm-terms" id="pm-terms" role="group" aria-label="Срок привилегии"></div>
        <div class="pm-buy">
          <span class="pm-price" id="pm-price"></span>
          <button class="btn btn-primary" id="pm-add" type="button">В корзину</button>
        </div>
      </div>
    </div>`);
  pm = {
    overlay: document.getElementById("pm-overlay"), el: document.getElementById("pm"),
    name: document.getElementById("pm-name"), terms: document.getElementById("pm-terms"),
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
