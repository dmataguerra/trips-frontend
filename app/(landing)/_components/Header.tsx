import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

export const AcmeLogo = () => {
  return (
    <Image
      src="/images/chihuahuenos-logo.svg"
      alt="Chihuahueños logo"
      width={40}
      height={40}
      priority={false}
    />
  );
};

export default function Header() {
  return (
    <Navbar shouldHideOnScroll className="bg-hero_bg ">
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-text_primary ml-2">Chihuahenses</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <a className="text-text_primary/90 hover:text-text_primary" href="#">
            Features
          </a>
        </NavbarItem>
        <NavbarItem isActive>
          <a className="text-text_primary font-semibold" aria-current="page" href="#">
            Customers
          </a>
        </NavbarItem>
        <NavbarItem>
          <a className="text-text_primary/90 hover:text-text_primary" href="#">
            Integrations
          </a>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="items-center">
        <NavbarItem className="hidden lg:flex">
          <a className="text-text_primary/90 hover:text-text_primary" href="#">Login</a>
        </NavbarItem>
        <NavbarItem>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 bg-primary hover:bg-accent text-white rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-focus transition"
          >
            Sign Up
          </a>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
