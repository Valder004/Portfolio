// Envoi du formulaire de contact.
//
// - Si PUBLIC_POCKETBASE_URL est renseigné (fichier .env), le message est enregistré
//   dans PocketBase (collection "messages", créée par pocketbase/pb_migrations).
//   Tu le retrouves ensuite dans l'admin PocketBase.
// - Sinon, le formulaire ouvre l'application mail du visiteur.

const POCKETBASE_URL = (import.meta.env.PUBLIC_POCKETBASE_URL ?? "").replace(/\/+$/, "");

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
