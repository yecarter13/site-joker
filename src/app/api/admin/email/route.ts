import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sendEmail, EMAIL_TEMPLATES } from "@/lib/email";

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token) return false;
  const admin = await prisma.admin.findUnique({ where: { id: token.value } });
  return !!admin;
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { to, subject, template, name, message, content } = await request.json();

    if (!to || !subject || !template) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    let emailData;

    switch (template) {
      case "confirmation":
        emailData = EMAIL_TEMPLATES.confirmation(name || "Client");
        break;
      case "relance":
        emailData = EMAIL_TEMPLATES.relance(name || "Client");
        break;
      case "info":
        emailData = EMAIL_TEMPLATES.info(name || "Client", message || "");
        break;
      case "personnalise":
        emailData = EMAIL_TEMPLATES.personnalise(name || "Client", content || message || "");
        break;
      default:
        emailData = EMAIL_TEMPLATES.info(name || "Client", message || "");
    }

    const info = await sendEmail({
      to,
      subject,
      title: emailData.title,
      body: emailData.body,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi: " + err.message }, { status: 500 });
  }
}
