"use strict";

function sanitize(value) {
  return String(value || "").trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  var resendApiKey = process.env.RESEND_API_KEY;
  var destinationEmail = process.env.CONTACT_TO_EMAIL;
  var fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!resendApiKey || !destinationEmail) {
    return res.status(500).json({ error: "Email service is not configured on the server." });
  }

  var payload = {};
  if (typeof req.body === "string") {
    try {
      payload = JSON.parse(req.body || "{}");
    } catch (error) {
      return res.status(400).json({ error: "Invalid request body." });
    }
  } else {
    payload = req.body || {};
  }
  var name = sanitize(payload.name);
  var email = sanitize(payload.email);
  var subject = sanitize(payload.subject);
  var message = sanitize(payload.message);

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Name, email, subject, and message are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  if (subject.length > 140) {
    return res.status(400).json({ error: "Subject is too long (max 140 characters)." });
  }

  if (message.length > 5000) {
    return res.status(400).json({ error: "Message is too long (max 5000 characters)." });
  }

  var textBody = [
    "New portfolio contact form submission",
    "",
    "Name: " + name,
    "Email: " + email,
    "Subject: " + subject,
    "",
    "Message:",
    message
  ].join("\n");

  var htmlBody = [
    "<h2>New portfolio contact form submission</h2>",
    "<p><strong>Name:</strong> " + escapeHtml(name) + "</p>",
    "<p><strong>Email:</strong> " + escapeHtml(email) + "</p>",
    "<p><strong>Subject:</strong> " + escapeHtml(subject) + "</p>",
    "<p><strong>Message:</strong></p>",
    '<p style="white-space:pre-wrap;">' + escapeHtml(message) + "</p>"
  ].join("");

  try {
    var resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + resendApiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [destinationEmail],
        reply_to: email,
        subject: "[Portfolio] " + subject,
        text: textBody,
        html: htmlBody
      })
    });

    if (!resendResponse.ok) {
      var resendError;
      try {
        resendError = await resendResponse.json();
      } catch (error) {
        resendError = { error: "Unknown provider error." };
      }
      console.error("Resend API error", resendError);
      return res.status(502).json({ error: "Email provider rejected the request. Please try again." });
    }

    return res.status(200).json({ message: "Message sent successfully. I will get back to you soon." });
  } catch (error) {
    console.error("Email send failure", error);
    return res.status(500).json({ error: "Unable to send message right now. Please try again later." });
  }
};
