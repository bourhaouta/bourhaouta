"use server";

import { Resend } from "resend";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  // Sent back on error so the form keeps what the user typed
  fields?: { name: string; email: string; message: string };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real people leave this empty
  if (formData.get("bot-field")) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const fields = { name, email, message };

  if (!name || !message || !EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please fill in your name, a valid email and a message.", fields };
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Contact form is missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL");
    return { status: "error", message: "Sorry, the form is not working right now.", fields };
  }

  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return { status: "error", message: "Sorry, your message could not be sent. Please try again.", fields };
  }

  return { status: "success", message: "Thanks! Your message was sent." };
}
