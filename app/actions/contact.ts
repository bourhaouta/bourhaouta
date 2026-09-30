"use server";

import { Resend } from "resend";
import { CONTACT_LIMITS, type ContactState } from "@/lib/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real people leave this empty
  if (formData.get("bot-field")) return { status: "success" };

  // Collapse whitespace so the name is safe to use in the subject line
  const name = field(formData, "name").replace(/\s+/g, " ");
  const email = field(formData, "email");
  const message = field(formData, "message");
  const fields = { name, email, message };

  if (!name || !message || !EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please fill in your name, a valid email and a message.", fields };
  }

  if (
    name.length > CONTACT_LIMITS.name ||
    email.length > CONTACT_LIMITS.email ||
    message.length > CONTACT_LIMITS.message
  ) {
    return { status: "error", message: "Your message is too long. Please make it shorter.", fields };
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
