// Visionneuse d'images : tout bouton [data-lightbox-src] ouvre l'image en plein écran.

const triggers = document.querySelectorAll("[data-lightbox-src]");

if (triggers.length) {
  const dialog = document.createElement("dialog");
  dialog.className = "project-lightbox";
  dialog.innerHTML = `
    <div class="lightbox-topbar">
      <p data-lb-title><span>Vue intégrale</span></p>
      <button type="button" data-lb-close aria-label="Fermer le visuel agrandi">Fermer <span aria-hidden="true">×</span></button>
    </div>
    <img class="lightbox-image" alt="" data-lb-image />
    <p class="lightbox-hint">Échap ou cliquez autour de l’image pour fermer</p>
  `;
  document.body.append(dialog);

  const title = dialog.querySelector("[data-lb-title]");
  const image = dialog.querySelector("[data-lb-image]");
  const closeButton = dialog.querySelector("[data-lb-close]");
  let previousOverflow = "";
  let lastTrigger = null;

  // Nœud texte placé avant « Vue intégrale » pour afficher le titre du projet
  const titleText = document.createTextNode("");
  title.prepend(titleText);

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      lastTrigger = trigger;
      titleText.textContent = trigger.dataset.lightboxTitle ?? "";
      image.src = trigger.dataset.lightboxSrc;
      image.alt = trigger.dataset.lightboxAlt ?? "";
      dialog.setAttribute("aria-label", `Visuel agrandi — ${trigger.dataset.lightboxTitle ?? ""}`);
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      dialog.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener("click", () => dialog.close());

  // Clic en dehors de l'image (sur le fond du dialog) = fermeture
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    document.body.style.overflow = previousOverflow;
    image.removeAttribute("src");
    lastTrigger?.focus();
  });
}
