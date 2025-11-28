"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { API_URL } from "@/constants";

const AcmeLogo = () => (
  <Image
    src="/images/chihuahuenos-logo.svg"
    alt="Chihuahueños logo"
    width={80}
    height={80}
    priority={false}
  />
);

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  return (
    <Navbar shouldHideOnScroll className="bg-hero_bg">
      <NavbarBrand>
        <Link href="http://localhost:3000" className="inline-flex items-center">
          <AcmeLogo />
          <p className="font-bold text-text_primary ml-2">S.A. de C.V.</p>
        </Link>
      </NavbarBrand>


      <NavbarContent justify="end" className="items-center gap-3">
        <NavbarItem>
          <a
            href="/dashboard2/buses"
            className="inline-flex items-center px-4 py-2 bg-white text-text_primary border border-gray-200 hover:bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-focus transition"
          >
            Buses
          </a>
        </NavbarItem>
        <NavbarItem>
          <a
            href="/dashboard2/routes"
            className="inline-flex items-center px-4 py-2 bg-white text-text_primary border border-gray-200 hover:bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-focus transition"
          >
            Rutas
          </a>
        </NavbarItem>
        <NavbarItem>
          <a
            href="/dashboard2/trips"
            className="inline-flex items-center px-4 py-2 bg-white text-text_primary border border-gray-200 hover:bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-focus transition"
          >
            Viajes
          </a>
        </NavbarItem>

        <NavbarItem>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-text_primary rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-focus transition"
              onClick={handleLogout}
            >
              Logout
            </button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
