// Visionneuse d'images : tout bouton [data-lightbox-src] ouvre l'image en plein écran.

const triggers = document.querySelectorAll("[data-lightbox-src]");

if (triggers.length) {
  const dialog = document.createElement("dialog");
  dialog.className =
    "fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-[rgb(12_12_12/0.97)] p-4 text-paper backdrop:bg-black/85 open:grid open:grid-rows-[auto_minmax(0,1fr)_auto] open:gap-4 md:p-8";
  dialog.innerHTML = `
    <div class="flex items-center justify-between gap-4">
      <p class="text-[0.95rem]" data-lb-title><span class="mt-1 block text-[0.7rem] text-orange-soft">Vue intégrale</span></p>
      <button type="button" class="flex min-h-11 cursor-pointer items-center gap-4 border border-paper/40 px-4 py-2" data-lb-close aria-label="Fermer le visuel agrandi">
        Fermer <span class="text-2xl" aria-hidden="true">×</span>
      </button>
    </div>
    <img class="pointer-events-none block size-full min-h-0 object-contain" alt="" data-lb-image />
    <p class="pointer-events-none text-center text-[0.7rem] text-paper/70">Échap ou touchez autour de l’image pour fermer</p>
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
