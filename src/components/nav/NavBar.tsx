"use client";
import React from "react";
import LanguageSelector from "../common/LanguageSelector";
import useAuthStore, { AuthState } from "@/stores/useAuthStore";
import YaoTag from "../auth/YaoTag";
import YaoLogo from "../auth/AuthLogo";
import NavLinks from "./NavLinks";

const NavBar = () => {
  const isVerified = useAuthStore((s: AuthState) => s.isVerified);

  return (
    <nav className="bg-darkest shadow-lg border-b border-main/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          <YaoLogo />
          <div className="flex-1 flex justify-center">
            <NavLinks />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {isVerified && <YaoTag />}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
