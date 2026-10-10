// Menu mobile : ouverture/fermeture, Échap, piège du focus, fermeture au redimensionnement.
// L'apparence est gérée en Tailwind via [data-open] (menu) et aria-expanded (bouton).

const toggle = document.querySelector("[data-menu-toggle]");
const label = document.querySelector("[data-menu-label]");
const menu = document.querySelector("[data-menu]");
const DESKTOP = window.matchMedia("(min-width: 48rem)"); // = breakpoint md de Tailwind

if (toggle && menu) {
  const links = Array.from(menu.querySelectorAll("a"));
  let open = false;
  let previousOverflow = "";

  function setOpen(value) {
    if (value === open) return;
    open = value;

    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    if (label) label.textContent = open ? "Fermer" : "Menu";
    menu.toggleAttribute("data-open", open);

    if (open) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      links[0]?.focus();
      document.addEventListener("keydown", onKeydown);
    } else {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeydown);
      if (!DESKTOP.matches) toggle.focus();
    }
  }

  function onKeydown(event) {
    if (event.key === "Escape") return setOpen(false);
    if (event.key !== "Tab") return;

    const controls = [toggle, ...links];
    const first = controls[0];
    const last = controls[controls.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  toggle.addEventListener("click", () => setOpen(!open));
  links.forEach((link) => link.addEventListener("click", () => setOpen(false)));
  DESKTOP.addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}
