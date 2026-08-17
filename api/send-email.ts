import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";


const RECIPIENT = "team@clhglobal.org";

const formTitles: Record<string, string> = {
  reto: "Reto para organizaciones",
  idea: "Idea para CLH",
  contacto: "Consulta general",
};

const formFieldLabels: Record<string, string> = {
  fullName: "Nombre y apellidos",
  email: "Correo electrónico",
  organization: "Organización",
  country: "País",
  solution: "Aplicación de interés",
  challenge: "Reto o necesidad",
  university: "Universidad u organización",
  ideaTitle: "Título de la idea",
  problem: "Problema identificado",
  proposal: "Propuesta y liderazgo",
  reason: "Motivo de la consulta",
  message: "Mensaje",
};

type Payload = {
  kind: "reto" | "idea" | "contacto";
  fields: Record<string, string>;
  privacy: boolean;
  confidentiality: boolean;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const body = req.body as Payload;

  if (!body || !["reto", "idea", "contacto"].includes(body.kind)) {
    res.status(400).json({ error: "Payload inválido" });
    return;
  }

  const fullName = body.fields.fullName?.trim() || "";
  const reason = body.fields.reason?.trim() || "";
  const subjectDetail = fullName || reason || formTitles[body.kind];
  const subject = `[CLH] ${formTitles[body.kind]} - ${subjectDetail}`;

  const rows = Object.entries(body.fields)
    .map(([key, value]) => `- ${formFieldLabels[key] ?? key}: ${value || "No indicado"}`)
    .join("\n");

  const confirmations = [
    body.privacy ? "- Acepto la política de privacidad y el tratamiento de estos datos." : "",
    body.confidentiality ? "- Confirmo que no comparto información confidencial de terceros." : "",
  ].filter(Boolean).join("\n");

  const text = [
    "Hola equipo CLH,",
    "",
    "Se ha enviado una nueva solicitud desde el formulario web.",
    "",
    `Tipo de formulario: ${formTitles[body.kind]}`,
    `Fecha: ${new Date().toLocaleString("es-ES")}`,
    "",
    "Datos recibidos:",
    rows,
    "",
    "Confirmaciones:",
    confirmations || "No aplica",
  ].join("\n");

 
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Formulario CLH" <${process.env.GMAIL_USER}>`,
      to: RECIPIENT,
      subject,
      text,
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error enviando email:", err);
    res.status(500).json({ error: "No se pudo enviar el correo" });
  }
}