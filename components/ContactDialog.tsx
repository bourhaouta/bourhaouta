"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { site } from "@/lib/site";
import ContactForm from "./ContactForm";
import Heading from "./Heading";
import Icon from "./Icon";
import sky from "@/public/images/sky.png";

/**
 * "Contact" button that opens the contact form in a native <dialog>.
 * Esc, the close button, or a click on the backdrop closes it.
 */
export default function ContactDialog({ buttonClassName }: { buttonClassName: string }) {
  const ref = useRef<HTMLDialogElement>(null);

  // A click on the dialog element itself (not its content) is a click on the backdrop
  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === ref.current) ref.current.close();
  }

  // Open with the cursor in the first field, ready to type
  function open() {
    ref.current?.showModal();
    ref.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
  }

  return (
    <>
      <button
        type="button"
        className={`cursor-pointer ${buttonClassName}`}
        onClick={open}
        data-event="nav_click"
        data-event-item="Contact"
      >
        Contact
      </button>

      <dialog
        ref={ref}
        onClick={closeOnBackdrop}
        aria-labelledby="contact-dialog-title"
        className="contact-dialog m-auto w-[calc(100%-2rem)] max-w-lg rounded-sm border bg-page p-0 text-xs font-normal tracking-normal text-ink normal-case shadow-2xl backdrop:bg-secondary-900/50 backdrop:backdrop-blur-sm"
      >
        {/* Same sky as the footer: behind the bottom of the dialog, fading out at the top */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[85%] [mask-image:linear-gradient(to_bottom,transparent,black_35%)] dark:hidden"
        >
          <Image className="object-cover object-bottom" src={sky} alt="" fill sizes="512px" />
        </div>

        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="absolute top-3 right-3 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded text-muted transition-colors hover:bg-surface hover:text-ink"
            aria-label="Close"
          >
            <Icon name="close" size={18} />
          </button>

          <Heading caption="Contact" className="items-center">
            <span id="contact-dialog-title">Get in touch</span>
          </Heading>

          <p className="mb-6 text-center text-muted">
            Email me at{" "}
            <a href={`mailto:${site.email}`} className="text-accent underline-offset-2 hover:underline">
              {site.email}
            </a>{" "}
            or send a message below.
          </p>

          <ContactForm className="" />
        </div>
      </dialog>
    </>
  );
}
