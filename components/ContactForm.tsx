"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import Button from "./Button";
import Icon from "./Icon";

const inputClass =
  "block w-full px-4 leading-tight text-gray-700 bg-white transition-colors duration-200 border rounded-sm appearance-none focus:outline-hidden focus:border-secondary-200";
const labelClass = "block mb-1 font-medium tracking-wide cursor-pointer";

const initialState: ContactState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  if (state.status === "success") {
    return <p className="mb-10 text-center text-sm">{state.message}</p>;
  }

  return (
    <form action={formAction} className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input type="text" name="bot-field" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

      <div>
        <label htmlFor="name" className={labelClass}>
          Full name
        </label>
        <input id="name" name="name" className={`h-10 ${inputClass}`} type="text" placeholder="John Doe" defaultValue={state.fields?.name} required />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          className={`h-10 ${inputClass}`}
          type="email"
          placeholder="john.doe@mail.com"
          defaultValue={state.fields?.email}
          required
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea id="message" name="message" className={`h-20 py-3 ${inputClass}`} placeholder="Your message" defaultValue={state.fields?.message} required />
      </div>

      <div className="flex items-center justify-end gap-4 sm:col-span-2">
        {state.status === "error" && (
          <p role="alert" className="text-primary-600">
            {state.message}
          </p>
        )}
        <Button type="submit" disabled={pending}>
          <span className="mr-2">{pending ? "Sending..." : "Send"}</span>
          <Icon name="send" />
        </Button>
      </div>
    </form>
  );
}
