import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

export const AcmeLogo = () => {
  return (
    <Image
      src="/images/chihuahuenos-logo.svg"
      alt="Chihuahueños logo"
      width={80}
      height={80}
      priority={false}
    />
  );
};

export default function Header() {
  return (
    <Navbar shouldHideOnScroll className="bg-hero_bg ">
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-text_primary ml-2">S.A. de C.V.</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <a className="text-text_primary/90 hover:text-text_primary" href="#footer">
            Contáctanos
          </a>
        </NavbarItem>
        <NavbarItem isActive>
          <a className="text-text_primary font-semibold" aria-current="page" href="#hero">
            Boletos
          </a>
        </NavbarItem>
        <NavbarItem>
          <a className="text-text_primary/90 hover:text-text_primary" href="#destinations">
            Destinos
          </a>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="items-center">
        <NavbarItem className="hidden lg:flex">
          <a className="text-text_primary/90 hover:text-text_primary" href="../../login">Login</a>
        </NavbarItem>
        <NavbarItem>
          <a
            href="../../signup"
            className="inline-flex items-center px-4 py-2 bg-primary hover:bg-accent text-white rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-focus transition"
          >
            Sign Up
          </a>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
