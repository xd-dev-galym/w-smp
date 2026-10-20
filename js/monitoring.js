// Страница мониторинга: показываем реальные данные сервера, без каких-либо поправок
(function () {
  const HOST = "wardensmp.minerent.io";
  const API = "https://api.mcsrvstat.us/3/" + HOST;
  const EVERY = 5000;      // как часто обновлять
  const TIMEOUT = 5000;    // сколько ждать ответ

  const $ = (id) => document.getElementById(id);
  const card = $("mon-status");
  if (!card) return;
  const els = {
    state: $("mon-state"), players: $("mon-players"), max: $("mon-max"), bar: $("mon-bar"),
    version: $("mon-version"), updated: $("mon-updated"), error: $("mon-error"), refresh: $("mon-refresh"),
  };
  const safeInt = (v) => { const n = Math.floor(Number(v)); return Number.isFinite(n) && n > 0 ? n : 0; };
  const fmt = (n) => n.toLocaleString("ru-RU");
  let timer = null, busy = false;

  function setState(state, label) {
    card.dataset.state = state;
    els.state.textContent = label;
  }
  function stamp() {
    els.updated.textContent = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }
  function showError(msg) {
    els.error.textContent = msg;
    els.error.hidden = !msg;
  }
  function paintOnline(d) {
    const online = safeInt(d.players && d.players.online);
    const max = safeInt(d.players && d.players.max);
    setState("online", "Онлайн");
    els.players.textContent = fmt(online);
    els.max.textContent = max ? "из " + fmt(max) + " слотов" : "\u00a0";
    els.bar.style.width = max ? Math.min(100, Math.round((online / max) * 100)) + "%" : "0%";
    const v = d.version ? String(d.version).replace(/^[^\d]*/, "") || String(d.version) : "";
    els.version.textContent = v || "—";
    showError("");
  }
  function paintOffline() {
    setState("offline", "Офлайн");
    els.players.textContent = "0";
    els.max.textContent = "\u00a0";
    els.bar.style.width = "0%";
    els.version.textContent = "—";
    showError("Сервер сейчас не отвечает. Мы это видим, проверяем состояние каждую секунду.");
  }
  function paintUnknown() {
    setState("unknown", "Нет данных");
    els.players.textContent = "—";
    els.max.textContent = "\u00a0";
    els.bar.style.width = "0%";
    els.version.textContent = "—";
    showError("Не удалось получить данные от сервиса мониторинга. Это не значит, что сервер выключен. Попробуем ещё раз автоматически.");
  }

  async function load() {
    if (busy) return;
    busy = true;
    els.refresh.disabled = true;
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), TIMEOUT);
    try {
      const res = await fetch(API, { signal: ctrl.signal, cache: "no-store" });
      if (!res.ok) throw new Error("http " + res.status);
      const d = await res.json();
      if (!d || typeof d !== "object" || typeof d.online !== "boolean") throw new Error("bad response");
      if (d.online) paintOnline(d); else paintOffline();
    } catch (e) {
      paintUnknown();
    } finally {
      clearTimeout(to);
      stamp();
      busy = false;
      els.refresh.disabled = false;
      schedule();
    }
  }
  function schedule() {
    clearTimeout(timer);
    if (!document.hidden) timer = setTimeout(load, EVERY);
  }

  els.refresh.addEventListener("click", load);
  document.addEventListener("visibilitychange", () => { if (document.hidden) clearTimeout(timer); else load(); });
  load();
})();
