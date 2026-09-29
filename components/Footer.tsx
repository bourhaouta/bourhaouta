import Image from "next/image";
import ContactForm from "./ContactForm";
import Heading from "./Heading";
import sky from "@/public/images/sky.png";

export default function Footer() {
  return (
    <footer className="relative mt-20">
      <Image className="absolute bottom-0 -z-1" src={sky} alt="" />

      <div className="site-container sm:px-20">
        <Heading caption="Contact" className="items-center">
          Get in touch
        </Heading>

        <ContactForm />
      </div>
    </footer>
  );
}
