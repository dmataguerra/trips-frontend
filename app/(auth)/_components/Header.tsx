import Image from "next/image";
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import AuthButton from "./AuthButton";

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
        <Link href="/" className="flex items-center">
          <AcmeLogo />
          <p className="font-bold text-text_primary ml-2">S.A. de C.V.</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end" className="items-center">
        <NavbarItem className="hidden lg:flex">
          <a className="text-text_primary/90 hover:text-text_primary" href="/">Inicio</a>
        </NavbarItem>
        <NavbarItem>
          
          <AuthButton />

        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}