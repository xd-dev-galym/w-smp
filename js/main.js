// Товары: порядок сверху вниз, от Спонсора к Воину. Цены впиши сюда (price: 199).
const PRODUCTS = [
  { id: "sponsor", name: "Спонсор", price: null },
  { id: "eternity", name: "Eternity", price: null },
  { id: "stinger", name: "Stinger", price: null },
  { id: "dragon", name: "Dragon", price: null },
  { id: "avenger", name: "Avenger", price: null },
  { id: "legend", name: "Legend", price: null },
  { id: "phantom", name: "Phantom", price: null },
  { id: "master", name: "Master", price: null },
  { id: "ghost", name: "Ghost", price: null },
  { id: "paladin", name: "Паладин", price: null },
  { id: "geroy", name: "Герой", price: null },
  { id: "lord", name: "Лорд", price: null },
  { id: "voin", name: "Воин", price: null },
];

// Корзина (хранится в браузере)
const CART_KEY = "wsmp-cart";
const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } };
const setCart = (c) => { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {} };
const badge = document.querySelector(".badge");
function paintCart() {
  const n = getCart().length;
  if (badge) { badge.textContent = n; badge.classList.toggle("on", n > 0); }
  document.querySelectorAll(".add").forEach((b) => {
    const inCart = getCart().includes(b.dataset.id);
    b.classList.toggle("done", inCart);
    b.textContent = inCart ? "В корзине" : "В корзину";
  });
}

// Карточки товаров
const grid = document.getElementById("products");
if (grid) {
  const box = '<svg class="ic" viewBox="0 0 24 24"><path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>';
  grid.innerHTML = PRODUCTS.map((p) => `
    <article class="card">
      <a class="card-img" href="privilege/${p.id}.html" aria-label="${p.name}">${box}</a>
      <div class="card-body">
        <span class="card-cat">Привилегии</span>
        <a class="card-name" href="privilege/${p.id}.html">${p.name}</a>
        <span class="card-price">${p.price ? p.price : "—"} ₽</span>
        <button class="add" type="button" data-id="${p.id}">В корзину</button>
      </div>
    </article>`).join("");
  grid.addEventListener("click", (e) => {
    const b = e.target.closest(".add");
    if (!b) return;
    const cart = getCart();
    if (!cart.includes(b.dataset.id)) { cart.push(b.dataset.id); setCart(cart); }
    paintCart();
  });
}
paintCart();

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
