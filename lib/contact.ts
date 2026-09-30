// Shared by the contact form (browser checks) and the server action (real checks)
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

export type ContactFields = { name: string; email: string; message: string };

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  // Sent back on error so the form keeps what the user typed
  fields?: ContactFields;
};
