// Копирование IP сервера
document.querySelectorAll("[data-copy]").forEach((btn) => {
  const label = btn.querySelector("i");
  const original = label ? label.textContent : "";
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      if (label) label.textContent = "Скопировано";
    } catch (e) {
      if (label) label.textContent = "Скопируй вручную";
    }
    if (label) setTimeout(() => (label.textContent = original), 2000);
  });
});

// Мобильное меню
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}
