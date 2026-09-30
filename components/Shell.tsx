import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar, { type Back } from "./Navbar";

export default function Shell({ back, children }: { back?: Back; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col text-xs text-secondary-500">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>

      <Navbar back={back} />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
