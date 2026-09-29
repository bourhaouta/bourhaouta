import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar, { type Back } from "./Navbar";

export default function Shell({ back, children }: { back?: Back; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col text-xs text-secondary-500">
      <Navbar back={back} />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
