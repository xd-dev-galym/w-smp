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
  { id: "title", name: "Кастомный титул", cat: "other", type: "title", price: 129,
    about: [
      "Напишите свой титул: только буквы (русские и английские) и цифры, без пробелов и знаков",
      "Выберите оформление: обычный текст, градиент из двух цветов (HEX) или цвета кодами &",
    ] },
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
const money = (n) => WCUR.fmt(n); // цены хранятся в рублях, показываются в выбранной валюте
const fmtNum = (n) => n.toLocaleString("ru-RU");

// Цены, записанные прямо в HTML (например, на странице акций): data-price-rub="3599"
function paintStaticPrices() {
  document.querySelectorAll("[data-price-rub]").forEach((el) => { el.textContent = money(Number(el.dataset.priceRub)); });
}
paintStaticPrices();
const ICONS = {
  box: '<svg class="ic" viewBox="0 0 24 24"><path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  coin: '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8.5 9l3.5 7 3.5-7"/></svg>',
};

// Иконки привилегий: у каждой свой цвет (в style), рисунок идёт линией цвета currentColor
Object.assign(ICONS, {
  crown: '<svg class="rk" viewBox="0 0 64 64" style="color:#ffc83d" aria-hidden="true"><path d="M12 20 L22 32 L32 14 L42 32 L52 20 L48 44 H16 Z" fill="currentColor" fill-opacity=".16"/><path d="M16 50h32"/><circle cx="12" cy="20" r="3" fill="currentColor"/><circle cx="32" cy="14" r="3" fill="currentColor"/><circle cx="52" cy="20" r="3" fill="currentColor"/><path d="M32 31 l4 5 -4 5 -4 -5 z" fill="currentColor" fill-opacity=".6"/></svg>',
  infinity: '<svg class="rk" viewBox="0 0 64 64" style="color:#9b7bff" aria-hidden="true"><path d="M32 32 C26 22 10 22 10 32 C10 42 26 42 32 32 C38 22 54 22 54 32 C54 42 38 42 32 32 Z" fill="currentColor" fill-opacity=".16" stroke-width="4"/><path d="M50 8v10M45 13h10M13 48v7M9.5 51.5h7"/></svg>',
  stinger: '<svg class="rk" viewBox="0 0 64 64" style="color:#ffb020" aria-hidden="true"><path d="M32 4 L38 36 L32 44 L26 36 Z" fill="currentColor" fill-opacity=".16"/><path d="M32 12 V36"/><path d="M24 4h16"/><path d="M32 50 C37 55 39 58 32 61 C25 58 27 55 32 50 Z" fill="currentColor"/></svg>',
  dragon: '<svg class="rk" viewBox="0 0 64 64" style="color:#ff5a4d" aria-hidden="true"><path d="M6 34 C16 20 48 20 58 34 C48 48 16 48 6 34 Z" fill="currentColor" fill-opacity=".16"/><circle cx="32" cy="34" r="9" fill="currentColor" fill-opacity=".16"/><path d="M32 23 C37 29 37 39 32 45 C27 39 27 29 32 23 Z" fill="currentColor"/><path d="M10 24 L6 13 L17 19 M54 24 L58 13 L47 19"/></svg>',
  swords: '<svg class="rk" viewBox="0 0 64 64" style="color:#ff7a45" aria-hidden="true"><g transform="rotate(40 32 32)"><path d="M32 3 L37 10 V38 H27 V10 Z" fill="currentColor" fill-opacity=".16"/><path d="M20 38h24M32 38v12"/><circle cx="32" cy="54" r="2.6" fill="currentColor"/></g><g transform="rotate(-40 32 32)"><path d="M32 3 L37 10 V38 H27 V10 Z" fill="currentColor" fill-opacity=".16"/><path d="M20 38h24M32 38v12"/><circle cx="32" cy="54" r="2.6" fill="currentColor"/></g></svg>',
  legend: '<svg class="rk" viewBox="0 0 64 64" style="color:#ffd84a" aria-hidden="true"><path d="M32.0,8.0 L36.9,21.2 L51.0,21.8 L40.0,30.6 L43.8,44.2 L32.0,36.4 L20.2,44.2 L24.0,30.6 L13.0,21.8 L27.1,21.2 Z" fill="currentColor" fill-opacity=".16"/><path d="M12 40 C12 52 21 59 32 59 C43 59 52 52 52 40"/><path d="M16 49l-5-1M24 55l-3 4M48 49l5-1M40 55l3 4"/></svg>',
  mask: '<svg class="rk" viewBox="0 0 64 64" style="color:#7a8cff" aria-hidden="true"><path d="M12 24 C12 14 52 14 52 24 C52 42 42 54 32 54 C22 54 12 42 12 24 Z" fill="currentColor" fill-opacity=".16"/><path d="M18 26 C22 22 28 24 29 29 C25 32 19 31 18 26 Z" fill="currentColor" fill-opacity=".85"/><path d="M46 26 C42 22 36 24 35 29 C39 32 45 31 46 26 Z" fill="currentColor" fill-opacity=".85"/><path d="M24 43 C28 47 36 47 40 43"/></svg>',
  gem: '<svg class="rk" viewBox="0 0 64 64" style="color:#35d4ff" aria-hidden="true"><path d="M18 16 H46 L58 28 L32 58 L6 28 Z" fill="currentColor" fill-opacity=".16"/><path d="M6 28h52M22 28 L32 58 L42 28 M22 28 L27 16 M42 28 L37 16 M27 16 L32 28 L37 16"/></svg>',
  ghost: '<svg class="rk" viewBox="0 0 64 64" style="color:#9fd4ff" aria-hidden="true"><path d="M14 56 V28 C14 10 50 10 50 28 V56 L44 50 L38 56 L32 50 L26 56 L20 50 Z" fill="currentColor" fill-opacity=".16"/><circle cx="25" cy="29" r="3.2" fill="currentColor"/><circle cx="39" cy="29" r="3.2" fill="currentColor"/><path d="M29.5 38 a2.5 3.4 0 1 0 5 0 a2.5 3.4 0 1 0 -5 0" fill="currentColor" fill-opacity=".16"/></svg>',
  shield: '<svg class="rk" viewBox="0 0 64 64" style="color:#f6e7b0" aria-hidden="true"><path d="M32 7 L53 14 V30 C53 44 43 52 32 58 C21 52 11 44 11 30 V14 Z" fill="currentColor" fill-opacity=".16"/><path d="M32 18 V47 M21 28 H43" stroke-width="3.4"/></svg>',
  bolt: '<svg class="rk" viewBox="0 0 64 64" style="color:#a6ff4d" aria-hidden="true"><path d="M37 5 L14 37 H29 L25 59 L51 25 H36 Z" fill="currentColor" fill-opacity=".16"/></svg>',
  castle: '<svg class="rk" viewBox="0 0 64 64" style="color:#c070ff" aria-hidden="true"><path d="M15 57 V28 H20 V22 H26 V28 H30 V22 H34 V28 H38 V22 H44 V28 H49 V57 Z" fill="currentColor" fill-opacity=".16"/><path d="M27 57 V46 a5 5 0 0 1 10 0 V57"/><path d="M32 22 V7"/><path d="M32 7 L46 12 L32 17 Z" fill="currentColor"/><path d="M32 34 v5"/></svg>',
  axe: '<svg class="rk" viewBox="0 0 64 64" style="color:#4ade80" aria-hidden="true"><g transform="rotate(24 32 32)"><path d="M32 6 V59" stroke-width="3.6"/><path d="M32 9 C51 6 60 21 55 38 C48 31 40 30 32 33 Z" fill="currentColor" fill-opacity=".16"/><path d="M32 14 L20 19 L32 25" fill="currentColor" fill-opacity=".16"/></g></svg>',
});
const RANK_ICON = {
  sponsor: "crown", eternity: "infinity", stinger: "stinger", dragon: "dragon", avenger: "swords", legend: "legend", phantom: "mask", master: "gem", ghost: "ghost", paladin: "shield", geroy: "bolt", lord: "castle", voin: "axe",
};
PRODUCTS.forEach((p) => { if (!p.icon && RANK_ICON[p.id]) p.icon = RANK_ICON[p.id]; });

// Фото привилегий: голова и половина туловища, фон вырезан (img/privileges/*.webp, высота 560, w — ширина).
// c — цвет свечения за персонажем.
const PHOTO = {
  sponsor:  { f: "sponsor",  w: 950,  c: "#ffc83d", wide: 1 }, eternity: { f: "eternity", w: 952, c: "#9b7bff", wide: 1 },
  stinger:  { f: "stinger",  w: 487,  c: "#ffb020" }, dragon:   { f: "dragon",   w: 653, c: "#ff5a4d" },
  avenger:  { f: "avenger",  w: 952,  c: "#ff7a45", wide: 1 }, legend:   { f: "legend",   w: 569, c: "#ffd84a" },
  phantom:  { f: "phantom",  w: 650,  c: "#7a8cff" }, master:   { f: "master",   w: 476, c: "#35d4ff" },
  ghost:    { f: "ghost",    w: 643,  c: "#9fd4ff" }, paladin:  { f: "paladin",  w: 953, c: "#f6e7b0", wide: 1 },
  geroy:    { f: "hero",     w: 952,  c: "#a6ff4d", wide: 1 }, lord:     { f: "lord",     w: 692, c: "#c070ff" },
  voin:     { f: "voin",     w: 513,  c: "#4ade80" },
  // Иконки (не бюсты): стоят по центру карточки, с лёгким покачиванием
  unmute:   { f: "unmute",   w: 560,  c: "#ff3b3b", icon: 1 }, unban: { f: "unban", w: 560, c: "#22b8d8", icon: 1 },
};
const artHtml = (p, eager) => PHOTO[p.id]
  ? `<img class="rank-photo${PHOTO[p.id].wide ? " wide" : ""}${PHOTO[p.id].icon ? " icon" : ""}" src="img/privileges/${PHOTO[p.id].f}.webp?v=3" alt="" width="${PHOTO[p.id].w}" height="560" decoding="async"${eager ? "" : ' loading="lazy"'}>`
  : ICONS[p.icon || "box"];

// Категории товаров (порядок кнопок)
// Подписи бейджей категорий на карточках (CSS делает их заглавными)
const CARD_CAT = {
  priv: "Привилегии",
  varda: "Донат валюта",
  other: "Прочее",
};

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
  if (t === "title") {
    if (!e.text) return null;
    const mode = e.mode === "gradient" ? `градиент ${e.c1} → ${e.c2}` : e.mode === "codes" ? "цвета &-кодами" : "обычный текст";
    return { p, price: p.price, label: `«${esc(e.text)}» · ${mode}` };
  }
  if (e.rub == null) return null;
  const rub = clampRub(e.rub);
  const d = discountFor(rub);
  return { p, price: payFor(rub), label: vardsText(vardsFor(rub)) + (d ? ` · скидка ${d}%` : "") };
}

// ---- Каталог: карточки и категории ----
const grid = document.getElementById("products");
const searchBox = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
let activeCat = "all";
let vdRub = 100;
function cardPrice(p) {
  const t = typeOf(p);
  if (t === "item" || t === "title") return money(p.price);
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
  const q = searchQuery();
  const list = PRODUCTS.filter((p) => (activeCat === "all" || (p.cat || "priv") === activeCat)
    && (!q || p.name.toLowerCase().includes(q)));
  if (!list.length && q) {
    grid.innerHTML = `<p class="search-empty">По запросу «${escapeHtml(q)}» ничего не найдено</p>`;
    return;
  }
  grid.innerHTML = list.map((p) => `
    <article class="card">
      <button class="card-img${PHOTO[p.id] ? " has-photo" : ""}${PHOTO[p.id] && PHOTO[p.id].icon ? " has-icon" : ""}"${PHOTO[p.id] ? ` style="--rk:${PHOTO[p.id].c}"` : ""} type="button" data-open="${p.id}" aria-label="${p.name}: выбрать вариант">${artHtml(p)}</button>
      <div class="card-body">
        <span class="card-cat" data-cat="${p.cat || "priv"}">${CARD_CAT[p.cat || "priv"]}</span>
        <button class="card-name" type="button" data-open="${p.id}">${p.name}</button>
        <span class="card-price">${cardPrice(p)}</span>
        <button class="add" type="button" data-open="${p.id}">Выбрать вариант</button>
      </div>
    </article>`).join("");
}
function setCat(id) {
  activeCat = id;
  document.querySelectorAll(".cat[data-cat]").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.cat === id)));
  // В категории «Варды» поиск не нужен: там одна панель, а не список товаров
  if (id === "varda") toggleSearch(false);
  document.querySelectorAll(".search").forEach((x) => x.classList.toggle("is-hidden", id === "varda"));
  renderGrid();
}

// Поиск товара по названию: строка выезжает слева от кнопки
function searchQuery() { return searchInput ? searchInput.value.trim().toLowerCase() : ""; }
function escapeHtml(t) { return String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[c]); }
function toggleSearch(open) {
  if (!searchBox) return;
  const now = typeof open === "boolean" ? open : !searchBox.classList.contains("open");
  searchBox.classList.toggle("open", now);
  searchBtn.setAttribute("aria-expanded", String(now));
  searchBtn.setAttribute("aria-label", now ? "Закрыть поиск" : "Открыть поиск");
  if (now) {
    setTimeout(() => searchInput.focus({ preventScroll: true }), 150);
  } else if (searchInput.value) {
    searchInput.value = "";
    renderGrid();
  }
}
if (searchBox) {
  searchBtn.addEventListener("click", () => toggleSearch());
  searchInput.addEventListener("input", renderGrid);
  searchInput.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleSearch(false); });
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
// Кастомный титул: текст из букв и цифр, оформление — обычный, градиент HEX или коды &
const TT_MAX = 16;
const TT_LETTERS = /^[A-Za-zА-Яа-яЁё0-9]+$/;
function ttBody() { return pm.tt.mode === "codes" ? pm.tt.text.replace(/&[0-9a-fk-or]/gi, "") : pm.tt.text; }
function ttError() {
  const t = pm.tt.text;
  if (!t) return "";
  if (pm.tt.mode === "codes" && t.includes("&") && /&(?![0-9a-fk-or])/i.test(t.replace(/&&/g, ""))) return "Неверный код цвета: используйте &0–9, &a–f, &k–o или &r";
  if (!TT_LETTERS.test(ttBody())) return "Можно только русские и английские буквы и цифры";
  return "";
}
function ttNext() {
  if (!pm.tt.text || ttError()) return null;
  const n = { id: "title", text: pm.tt.text, mode: pm.tt.mode };
  if (pm.tt.mode === "gradient") { n.c1 = pm.tt.c1; n.c2 = pm.tt.c2; }
  return n;
}
function paintTitleBuy() {
  const p = PRODUCTS.find((x) => x.id === pm.id);
  const entry = getCart().find((x) => x.id === pm.id);
  const next = ttNext();
  pm.next = next;
  pm.price.textContent = money(p.price);
  const err = document.getElementById("tt-err");
  if (err) err.textContent = ttError();
  pm.add.disabled = !next;
  const same = entry && next && JSON.stringify(entry) === JSON.stringify(next);
  pm.add.textContent = !entry ? "В корзину" : same ? "Открыть корзину" : "Изменить титул";
}
function paintTitle() {
  const modes = [["plain", "Обычный"], ["gradient", "Градиент HEX"], ["codes", "Коды &"]];
  pm.terms.innerHTML = `
    <div class="tt-modes" role="group" aria-label="Оформление титула">
      ${modes.map(([k, l]) => `<button class="tt-mode" type="button" data-tmode="${k}" aria-pressed="${pm.tt.mode === k}">${l}</button>`).join("")}
    </div>
    <label class="tt-field"><span>Текст титула</span>
      <input id="tt-text" type="text" maxlength="${TT_MAX}" autocomplete="off" placeholder="Например: Герой2026" value="${esc(pm.tt.text).replace(/"/g, "&quot;")}">
    </label>
    ${pm.tt.mode === "gradient" ? `<div class="tt-colors">
      <label>Цвет 1 <input type="color" id="tt-c1" value="${pm.tt.c1}"></label>
      <label>Цвет 2 <input type="color" id="tt-c2" value="${pm.tt.c2}"></label>
    </div>` : ""}
    ${pm.tt.mode === "codes" ? `<p class="tt-hint">Коды ставятся перед текстом: &amp;c красный, &amp;a зелёный, &amp;l жирный, &amp;r сброс. Пример: &amp;cТитул&amp;l</p>` : ""}
    <p class="tt-err" id="tt-err" role="alert"></p>`;
  document.getElementById("tt-text").addEventListener("input", (e) => { pm.tt.text = e.target.value.trim(); paintTitleBuy(); });
  const c1 = document.getElementById("tt-c1"), c2 = document.getElementById("tt-c2");
  if (c1) c1.addEventListener("input", (e) => { pm.tt.c1 = e.target.value; paintTitleBuy(); });
  if (c2) c2.addEventListener("input", (e) => { pm.tt.c2 = e.target.value; paintTitleBuy(); });
  paintTitleBuy();
}
function paintPm() {
  if (pm.type === "title") return paintTitle();
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
  pm.tt = entry && entry.id === id && entry.text
    ? { mode: entry.mode || "plain", text: entry.text, c1: entry.c1 || "#22A0FE", c2: entry.c2 || "#ff4fd8" }
    : { mode: "plain", text: "", c1: "#22A0FE", c2: "#ff4fd8" };
  pm.name.textContent = p.name;
  pm.cat.textContent = CARD_CAT[p.cat || "priv"];
  pm.cat.dataset.cat = p.cat || "priv";
  pm.img.innerHTML = artHtml(p, true);
  pm.img.classList.toggle("has-photo", Boolean(PHOTO[p.id]));
  pm.img.classList.toggle("has-icon", Boolean(PHOTO[p.id] && PHOTO[p.id].icon));
  if (PHOTO[p.id]) pm.img.style.setProperty("--rk", PHOTO[p.id].c); else pm.img.style.removeProperty("--rk");
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
  const tmode = e.target.closest("[data-tmode]");
  if (tmode && pm && pm.type === "title") { pm.tt.mode = tmode.dataset.tmode; return paintTitle(); }
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
const onlineEls = document.querySelectorAll("[data-online]");
if (onlineEls.length) {
  fetch("https://api.mcsrvstat.us/3/mc.w-smp.in")
    .then((r) => r.json())
    .then((d) => { if (d.online && d.players) onlineEls.forEach((el) => { el.textContent = d.players.online + "/" + d.players.max; }); })
    .catch(() => {});
}

// Мобильное меню
const navPill = document.querySelector(".nav");
if (navPill) {
  const pill = document.createElement("span");
  pill.className = "nav-pill";
  pill.setAttribute("aria-hidden", "true");
  navPill.prepend(pill);
  const current = () => navPill.querySelector('a[aria-current="page"]');
  let hovered = null;
  function placePill(a) {
    const r = a ? a.getBoundingClientRect() : null;
    if (!r || r.width === 0) { pill.style.opacity = "0"; return; }
    const n = navPill.getBoundingClientRect();
    const x = r.left - n.left - navPill.clientLeft, y = r.top - n.top - navPill.clientTop;
    pill.style.opacity = "1";
    pill.style.width = r.width + "px";
    pill.style.height = r.height + "px";
    pill.style.transform = `translate(${x}px, ${y}px)`;
  }
  const refreshPill = () => placePill(hovered || current());
  navPill.querySelectorAll("a").forEach((a) => {
    a.addEventListener("mouseenter", () => { hovered = a; refreshPill(); });
    a.addEventListener("focus", () => { hovered = a; refreshPill(); });
    a.addEventListener("blur", () => { hovered = null; refreshPill(); });
  });
  navPill.addEventListener("mouseleave", () => { hovered = null; refreshPill(); });
  window.addEventListener("resize", refreshPill);
  new MutationObserver(refreshPill).observe(navPill, { attributes: true, attributeFilter: ["class"] });
  // первое положение без анимации, потом включаем переходы
  pill.style.transition = "none";
  refreshPill();
  requestAnimationFrame(() => requestAnimationFrame(() => { pill.style.transition = ""; }));
}
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// Смена валюты в шапке: перерисовываем все цены
document.addEventListener("currency:change", () => {
  paintStaticPrices();
  renderGrid();
  if (pm && pm.el.classList.contains("open")) { if (pm.type === "title") paintTitleBuy(); else paintPm(); }
});
