// Envoi du formulaire de contact.
//
// Aujourd'hui : ouvre l'application mail du visiteur (mailto), comme dans la maquette.
//
// Plus tard avec PocketBase :
//   1. Crée une collection "messages" avec les champs name (text), email (email), message (text)
//      et autorise la règle "Create" pour tout le monde (laisse List/View/Update/Delete fermées).
//   2. Renseigne PUBLIC_POCKETBASE_URL dans un fichier .env (voir .env.example).
//   3. C'est tout : la fonction ci-dessous utilisera automatiquement PocketBase.

const POCKETBASE_URL = import.meta.env.PUBLIC_POCKETBASE_URL;

/**
 * @param {{ name: string, email: string, message: string }} data
 * @param {string} fallbackEmail
 * @returns {Promise<"pocketbase" | "mailto">}
 */
export async function sendContactMessage(data, fallbackEmail) {
  if (POCKETBASE_URL) {
    const response = await fetch(`${POCKETBASE_URL}/api/collections/messages/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
    });
    if (!response.ok) throw new Error(`PocketBase a répondu ${response.status}`);
    return "pocketbase";
  }

  const subject = encodeURIComponent(`Prise de contact — ${data.name}`);
  const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
  window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
  return "mailto";
}
