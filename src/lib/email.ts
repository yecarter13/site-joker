import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const SITE_URL = "https://espace-habitats.fr";

function emailTemplate(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:30px 10px">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
<tr><td style="background:linear-gradient(135deg,#dc2626,#991b1b);border-radius:12px 12px 0 0;padding:30px 40px;text-align:center">
<img src="${SITE_URL}/logo.png" alt="Espace Habitat" width="60" height="60" style="border-radius:12px;margin-bottom:10px">
<h1 style="color:#fff;font-size:22px;margin:0;font-weight:700">Espace <span style="color:#fca5a5">Habitat</span></h1>
<p style="color:#fca5a5;font-size:13px;margin:4px 0 0">Votre partenaire de confiance</p>
</td></tr>
<tr><td style="background:#fff;padding:40px">
<h2 style="color:#1f2937;font-size:20px;margin:0 0 20px;font-weight:700">${title}</h2>
${body}
</td></tr>
<tr><td style="background:#f9fafb;border-radius:0 0 12px 12px;padding:25px 40px;text-align:center;border-top:1px solid #e5e7eb">
<p style="color:#6b7280;font-size:12px;margin:0 0 8px">Espace Habitat &bull; 12 RUE DE L'EUROPE &bull; 08170 FUMAY &bull; FRANCE</p>
<p style="color:#9ca3af;font-size:11px;margin:0">SIRET: 78542040700039</p>
<p style="color:#9ca3af;font-size:11px;margin:8px 0 0">
<a href="${SITE_URL}" style="color:#dc2626;text-decoration:none">espace-habitats.fr</a>
</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  title: string;
  body: string;
}) {
  const html = emailTemplate(options.title, options.body);

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || "Espace Habitat <contact@espace-habitats.fr>",
    to: options.to,
    subject: options.subject,
    html,
  });

  return info;
}

export const EMAIL_TEMPLATES = {
  confirmation: (name: string) => ({
    title: "Confirmation de réception",
    body: `<p style="color:#4b5563;font-size:15px;line-height:1.6">Bonjour <strong>${name}</strong>,</p>
<p style="color:#4b5563;font-size:15px;line-height:1.6">Nous vous remercions pour l'intérêt que vous portez à Espace Habitat.</p>
<p style="color:#4b5563;font-size:15px;line-height:1.6">Votre demande a bien été reçue. Notre équipe l'analyse actuellement et vous recontactera dans les plus brefs délais (généralement sous 24h).</p>
<div style="background:#fef2f2;border-left:4px solid #dc2626;padding:15px 20px;margin:20px 0;border-radius:4px">
<p style="color:#991b1b;font-size:13px;margin:0;font-weight:600">Prochaines étapes :</p>
<ul style="color:#991b1b;font-size:13px;margin:8px 0 0;padding-left:18px">
<li>Vérification de votre dossier</li>
<li>Analyse personnalisée de votre profil</li>
<li>Proposition des meilleures options</li>
</ul>
</div>
<p style="color:#4b5563;font-size:15px;line-height:1.6">Si vous avez des questions, n'hésitez pas à nous contacter directement.</p>
<p style="color:#4b5563;font-size:15px;line-height:1.6">Cordialement,<br><strong>L'équipe Espace Habitat</strong></p>`,
  }),

  relance: (name: string) => ({
    title: "Nous n'avons pas oublié votre projet",
    body: `<p style="color:#4b5563;font-size:15px;line-height:1.6">Bonjour <strong>${name}</strong>,</p>
<p style="color:#4b5563;font-size:15px;line-height:1.6">Nous souhaitons prendre de vos nouvelles concernant votre recherche de logement.</p>
<p style="color:#4b5563;font-size:15px;line-height:1.6">Notre service d'analyse de dossier locatif est toujours à votre disposition pour vous accompagner dans vos démarches.</p>
<div style="text-align:center;margin:25px 0">
<a href="${SITE_URL}" style="background:#dc2626;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;display:inline-block">Découvrir nos services</a>
</div>
<p style="color:#4b5563;font-size:15px;line-height:1.6">N'hésitez pas à nous contacter pour toute question.</p>
<p style="color:#4b5563;font-size:15px;line-height:1.6">Cordialement,<br><strong>L'équipe Espace Habitat</strong></p>`,
  }),

  info: (name: string, message: string) => ({
    title: "Information importante",
    body: `<p style="color:#4b5563;font-size:15px;line-height:1.6">Bonjour <strong>${name}</strong>,</p>
<p style="color:#4b5563;font-size:15px;line-height:1.6">${message}</p>
<p style="color:#4b5563;font-size:15px;line-height:1.6">Cordialement,<br><strong>L'équipe Espace Habitat</strong></p>`,
  }),

  personnalise: (name: string, content: string) => ({
    title: "Message de la part d'Espace Habitat",
    body: `<p style="color:#4b5563;font-size:15px;line-height:1.6">Bonjour <strong>${name}</strong>,</p>
${content}
<p style="color:#4b5563;font-size:15px;line-height:1.6">Cordialement,<br><strong>L'équipe Espace Habitat</strong></p>`,
  }),
};
