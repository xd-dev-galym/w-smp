// Паспорт игрока: публичная страница + вход через Minecraft.
// Здесь нет секретов: баланс, время игры и UUID сайт может только читать.
// Вход подтверждается игроком в игре командой плагина, токен сессии хранится у браузера и проверяется на сервере.
(function () {
  "use strict";
  const card = document.getElementById("pp-card");
  if (!card) return;

  const API = String(window.WSMP_PASSPORT_API || "").replace(/\/+$/, "");
  const CURRENCY = "Вардов";                         // единица баланса (Vault Economy)
  const NICK_RE = /^[.A-Za-z0-9_]{1,17}$/;
  const UUID_RE = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
  const SESSION_KEY = "wsmp-session";
  const ME_KEY = "wsmp-me";

  const $ = (id) => document.getElementById(id);
  const el = {
    title: $("pp-title"), disabled: $("pp-disabled"), search: $("pp-search"), nick: $("pp-nick"), loginBtn: $("pp-login-btn"),
    msg: $("pp-msg"), card: card, skinBox: $("pp-skin-box"), skin: $("pp-skin"), name: $("pp-name"), badge: $("pp-badge"),
    time: $("pp-time"), balance: $("pp-balance"), url: $("pp-url"), copy: $("pp-copy"), login: $("pp-login"), owner: $("pp-owner"),
  };

  let token = null;
  let me = null;           // {uuid, name} владельца текущей сессии
  let loginRun = 0;        // номер попытки входа (чтобы остановить старый опрос)

  // ---------- хранилище (может быть недоступно) ----------
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* приватный режим */ } },
    del: (k) => { try { localStorage.removeItem(k); } catch { /* ничего */ } },
  };

  // ---------- маленькие помощники ----------
  function h(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === false || v == null) continue;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat()) if (kid != null) n.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    return n;
  }
  const fmtNum = (n, d) => Number(n).toLocaleString("ru-RU", { maximumFractionDigits: d });
  const fmtDate = (ms) => new Date(ms).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });
  const plain = (u) => u.replace(/-/g, "").toLowerCase();
  function showMsg(text) { el.msg.textContent = text || ""; el.msg.hidden = !text; }
  function setTitle(t) { document.title = "mc.w-smp.in | " + t; }

  function uaLabel(ua) {
    ua = String(ua || "");
    const browser = /Edg\//.test(ua) ? "Edge" : /OPR\//.test(ua) ? "Opera" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "Браузер";
    const os = /Windows/.test(ua) ? "Windows" : /Android/.test(ua) ? "Android" : /iPhone|iPad|iOS/.test(ua) ? "iOS" : /Mac OS/.test(ua) ? "macOS" : /Linux/.test(ua) ? "Linux" : "устройство";
    return browser + " · " + os;
  }

  // ---------- запросы к API ----------
  async function api(path, opts) {
    const o = opts || {};
    const headers = {};
    if (o.body !== undefined) headers["Content-Type"] = "application/json";
    if (o.auth && token) headers.Authorization = "Bearer " + token;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch(API + path, {
        method: o.method || (o.body !== undefined ? "POST" : "GET"),
        headers, signal: ctrl.signal,
        body: o.body !== undefined ? JSON.stringify(o.body) : undefined,
      });
      let data = null;
      try { data = await res.json(); } catch { /* пустой ответ */ }
      return { ok: res.ok, status: res.status, data, retryAfter: Number(res.headers.get("Retry-After")) || 0 };
    } catch {
      return { ok: false, status: 0, data: null, retryAfter: 0 };
    } finally {
      clearTimeout(timer);
    }
  }
  function errorText(r, fallback) {
    if (r.status === 0) return "Не удалось связаться с сервисом паспорта. Проверьте интернет и попробуйте ещё раз.";
    if (r.status === 429) return "Слишком много запросов. Подождите" + (r.retryAfter ? " " + Math.ceil(r.retryAfter / 60) + " мин." : " немного") + " и повторите.";
    if (r.status === 503) return "Сервис паспорта временно недоступен. Попробуйте позже.";
    return fallback || "Что-то пошло не так. Попробуйте ещё раз.";
  }

  // ---------- паспорт ----------
  function setSkin(p) {
    const id = plain(p.uuid);
    const sources = [
      "https://mc-heads.net/body/" + id + "/360",
      "https://crafatar.com/renders/body/" + p.uuid + "?overlay&scale=8",
      "https://minotar.net/armor/body/" + encodeURIComponent(p.name) + "/360.png",
    ];
    let i = 0;
    el.skinBox.classList.remove("no-skin");
    el.skin.alt = "Скин игрока " + p.name;
    el.skin.onerror = () => {
      i += 1;
      if (i < sources.length) el.skin.src = sources[i];
      else { el.skin.onerror = null; el.skinBox.classList.add("no-skin"); }  // скин не удалось получить
    };
    el.skin.src = sources[0];
  }

  function renderPassport(p) {
    el.name.textContent = p.name;
    el.badge.textContent = p.online ? "Сейчас в игре" : "Не в сети";
    el.badge.classList.toggle("on", p.online);
    el.time.textContent = fmtNum(p.playtimeHours, 1) + " ч";
    el.balance.textContent = fmtNum(p.balance, 2) + " " + CURRENCY;
    el.url.value = location.origin + location.pathname + "?nick=" + encodeURIComponent(p.name);
    setSkin(p);
    el.card.hidden = false;
    setTitle("Паспорт " + p.name);
    el.title.textContent = "Паспорт игрока";
  }

  async function loadPassport(query) {
    showMsg("");
    el.card.hidden = true;
    el.owner.hidden = true;
    const qs = query.uuid ? "uuid=" + encodeURIComponent(query.uuid) : "nick=" + encodeURIComponent(query.nick);
    const r = await api("/api/passport?" + qs);
    if (r.status === 404) {
      showMsg("Игрок не найден. Паспорт появляется после первого входа на сервер mc.w-smp.in.");
      return;
    }
    if (r.status === 400) { showMsg("Проверьте ник: допустимы латинские буквы, цифры и подчёркивание."); return; }
    if (!r.ok || !r.data) { showMsg(errorText(r)); return; }
    renderPassport(r.data);
    if (me && me.uuid === r.data.uuid) renderOwner();
  }

  // ---------- вход ----------
  function saveSession(t, uuid, name) {
    token = t;
    me = { uuid, name };
    store.set(SESSION_KEY, t);
    store.set(ME_KEY, JSON.stringify(me));
  }
  function clearSession() {
    token = null; me = null;
    store.del(SESSION_KEY); store.del(ME_KEY);
  }
  function syncLoginButton() {
    el.loginBtn.textContent = me ? "Мой паспорт" : "Войти через Minecraft";
  }

  async function restoreSession() {
    token = store.get(SESSION_KEY);
    if (!token || !/^wsp_[A-Za-z0-9_-]{43}$/.test(token)) { clearSession(); return; }
    const r = await api("/api/me", { auth: true });
    if (r.ok && r.data && r.data.uuid) {
      me = { uuid: r.data.uuid, name: r.data.name };
      store.set(ME_KEY, JSON.stringify(me));
    } else if (r.status === 401) {
      clearSession();          // сессия закрыта или истекла
    }
  }

  function closeLogin() { loginRun += 1; el.login.hidden = true; el.login.replaceChildren(); }

  async function startLogin() {
    closeLogin();
    const run = loginRun;
    el.login.hidden = false;
    el.login.replaceChildren(h("p", { class: "pp-sub", text: "Получаем код…" }));
    const r = await api("/api/auth/link/start", { method: "POST", body: {} });
    if (run !== loginRun) return;
    if (!r.ok || !r.data) {
      el.login.replaceChildren(h("p", { class: "pp-sub", text: errorText(r) }), h("button", { class: "btn", type: "button", onclick: closeLogin }, "Закрыть"));
      return;
    }
    const { code, pendingId, secret, expiresAt } = r.data;
    const command = "/passport link " + code.replace("-", "");
    const timer = h("b", { class: "pp-timer" });
    const status = h("p", { class: "pp-sub", text: "Ждём подтверждения в игре…" });
    el.login.replaceChildren(
      h("h2", { text: "Вход через Minecraft" }),
      h("p", { class: "pp-sub" }, "Зайдите на сервер ", h("b", { text: "mc.w-smp.in" }), " и введите команду в чате. Код действует ", timer, "."),
      h("div", { class: "pp-code", text: code }),
      h("div", { class: "pp-cmd" },
        h("code", { text: command }),
        h("button", { class: "btn", type: "button", onclick: (e) => copyText(command, e.currentTarget) }, "Копировать команду")),
      status,
      h("p", { class: "pp-warn", text: "Никому не показывайте этот код и не вводите чужие. Тот, кто получит ваш код, сможет войти в ваш паспорт." }),
      h("button", { class: "btn", type: "button", onclick: closeLogin }, "Отмена")
    );

    const tick = () => {
      const left = Math.max(0, Math.round((expiresAt - Date.now()) / 1000));
      timer.textContent = Math.floor(left / 60) + ":" + String(left % 60).padStart(2, "0");
      return left;
    };
    tick();
    const poll = async () => {
      if (run !== loginRun) return;
      if (tick() <= 0) { expired(); return; }
      const s = await api("/api/auth/link/status", { body: { pendingId, secret } });
      if (run !== loginRun) return;
      if (s.ok && s.data && s.data.status === "ok") {
        saveSession(s.data.token, s.data.uuid, s.data.name);
        closeLogin();
        syncLoginButton();
        location.href = location.pathname + "?nick=" + encodeURIComponent(s.data.name);
        return;
      }
      if (s.ok && s.data && s.data.status === "expired") { expired(); return; }
      if (s.status === 429) status.textContent = "Слишком частые запросы, ждём…";
      setTimeout(poll, s.status === 429 ? 6000 : 2000);
    };
    const expired = () => {
      el.login.replaceChildren(
        h("p", { class: "pp-sub", text: "Код истёк. Получите новый и введите его в игре." }),
        h("button", { class: "btn btn-primary", type: "button", onclick: startLogin }, "Новый код"),
        h("button", { class: "btn", type: "button", onclick: closeLogin }, "Закрыть")
      );
    };
    setTimeout(poll, 2000);
  }

  async function copyText(text, button) {
    const prev = button ? button.textContent : "";
    try {
      await navigator.clipboard.writeText(text);
      if (button) button.textContent = "Скопировано";
    } catch {
      if (button) button.textContent = "Скопируйте вручную";
    }
    if (button) setTimeout(() => { button.textContent = prev; }, 1600);
  }

  // ---------- кабинет владельца ----------
  async function renderOwner() {
    if (!me) return;
    el.owner.hidden = false;
    el.owner.replaceChildren(h("p", { class: "pp-sub", text: "Загружаем устройства…" }));
    const r = await api("/api/auth/sessions", { auth: true });
    if (r.status === 401) { clearSession(); syncLoginButton(); el.owner.hidden = true; return; }
    const list = h("div", { class: "pp-sess-list" });
    const sessions = r.ok && r.data && Array.isArray(r.data.sessions) ? r.data.sessions : [];
    for (const s of sessions) {
      list.append(h("div", { class: "pp-sess" },
        h("div", {},
          h("b", { text: uaLabel(s.userAgent) + (s.current ? " (это устройство)" : "") }),
          h("small", { text: "Вход: " + fmtDate(s.createdAt) + " · активность: " + fmtDate(s.lastUsed) })),
        s.current ? null : h("button", { class: "btn", type: "button", onclick: () => revokeSession(s.id) }, "Завершить")));
    }
    el.owner.replaceChildren(
      h("h2", { text: "Это ваш паспорт" }),
      h("p", { class: "pp-sub", text: "Вы вошли как " + me.name + ". Данные паспорта нельзя изменить вручную: время игры и баланс приходят прямо с сервера." }),
      h("h3", { text: "Устройства с доступом" }),
      list,
      h("div", { class: "pp-actions" },
        h("button", { class: "btn", type: "button", onclick: doLogout }, "Выйти на этом устройстве"),
        h("button", { class: "btn pp-danger", type: "button", onclick: doUnlink }, "Отвязать аккаунт везде")),
      h("p", { class: "pp-sub", text: "Отвязать можно и из игры командой /passport unlink." })
    );
  }

  async function revokeSession(id) {
    const r = await api("/api/auth/sessions/revoke", { auth: true, body: { id } });
    if (r.ok) renderOwner(); else showMsg(errorText(r, "Не удалось завершить сессию."));
  }
  async function doLogout() {
    await api("/api/auth/logout", { auth: true, body: {} });
    clearSession();
    location.href = location.pathname;
  }
  async function doUnlink() {
    if (!confirm("Отвязать аккаунт? Все устройства, где вы входили в паспорт, будут отключены. Чтобы войти снова, понадобится новый код из игры.")) return;
    const r = await api("/api/auth/unlink", { auth: true, body: {} });
    if (!r.ok && r.status !== 401) { showMsg(errorText(r, "Не удалось отвязать аккаунт.")); return; }
    clearSession();
    location.href = location.pathname;
  }

  // ---------- запуск ----------
  function currentQuery() {
    const params = new URLSearchParams(location.search);
    const nick = (params.get("nick") || "").trim();
    const uuid = (params.get("uuid") || "").trim();
    if (uuid && UUID_RE.test(uuid)) return { uuid };
    if (nick && NICK_RE.test(nick)) return { nick };
    return null;
  }

  el.search.addEventListener("submit", (e) => {
    e.preventDefault();
    const nick = el.nick.value.trim();
    if (!NICK_RE.test(nick)) { showMsg("Проверьте ник: допустимы латинские буквы, цифры и подчёркивание, до 16 символов."); return; }
    location.href = location.pathname + "?nick=" + encodeURIComponent(nick);
  });
  el.loginBtn.addEventListener("click", () => {
    if (me) { location.href = location.pathname + "?nick=" + encodeURIComponent(me.name); return; }
    startLogin();
  });
  el.copy.addEventListener("click", () => copyText(el.url.value, el.copy));
  el.url.addEventListener("focus", () => el.url.select());

  (async function init() {
    if (!API) {
      el.disabled.hidden = false;
      el.search.hidden = true;
      return;
    }
    await restoreSession();
    syncLoginButton();
    let q = currentQuery();
    if (!q && me) { q = { nick: me.name }; history.replaceState(null, "", location.pathname + "?nick=" + encodeURIComponent(me.name)); }
    if (q) {
      if (q.nick) el.nick.value = q.nick;
      await loadPassport(q);
    } else {
      showMsg("Введите ник игрока или войдите через Minecraft, чтобы открыть свой паспорт.");
    }
  })();
})();
