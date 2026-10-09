// Общая шапка и подвал для всех страниц. Меняешь здесь, меняется везде.
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
        <button class="icon-btn" type="button" aria-label="Корзина">
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

  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.outerHTML = header;
  if (f) f.outerHTML = footer;
})();
