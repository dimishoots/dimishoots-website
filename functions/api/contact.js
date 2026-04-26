export async function onRequestPost({ request, env }) {
  const formData = await request.formData();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !subject || !message) {
    return new Response("Missing required fields.", { status: 400 });
  }

  const html = `
    <h2>New enquiry from dimishoots.ch</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Dimi Shoots <info@dimishoots.ch>",
      to: ["info@dimishoots.ch"],
      reply_to: email,
      subject: `New enquiry: ${subject}`,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return new Response(`Email sending failed: ${errorText}`, { status: 500 });
  }

  return Response.redirect(new URL("/contact?success=true", request.url), 303);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}