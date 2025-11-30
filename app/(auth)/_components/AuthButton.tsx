"use client";

import { Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthButton() {
  const router = useRouter();
  const pathname = usePathname();


  const isLogin = pathname === "/login";

  
  const targetPath = isLogin ? "/signup" : "/login";
  const buttonText = isLogin ? "Sign Up" : "Login";

  return (
    <Button
      // className="bg-green-200 hover:bg-green-800 rounded-md"
      className="inline-flex items-center px-4 py-2 bg-primary hover:bg-accent text-white rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-focus transition text-md"
      onPress={() => router.push(targetPath)}
    >
      {buttonText}
    </Button>
  );
}