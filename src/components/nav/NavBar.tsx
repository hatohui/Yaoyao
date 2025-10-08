"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import LanguageSelector from "../common/LanguageSelector";
import useAuthStore, { AuthState } from "@/stores/useAuthStore";
import { IoPaw } from "react-icons/io5";
import AuthOverLay from "../auth/AuthOverLay";

const NavBar = () => {
  const pathname = usePathname();
  const t = useTranslations("common");
  const isVerified = useAuthStore((s: AuthState) => s.isVerified);
  const setVerified = useAuthStore((s: AuthState) => s.setVerified);

  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (count === 0) return;
    const t = setTimeout(() => setCount(0), 3000);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logoutRef.current &&
        !logoutRef.current.contains(event.target as Node)
      ) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isVerified) {
      const next = count + 1;
      setCount(next);
      if (next >= 5) {
        setOpen(true);
        setCount(0);
      }
    }
  };

  const handleLogout = () => {
    setVerified(false);
    setShowLogout(false);
  };

  const navData = [
    { title: t("home"), link: "/" },
    { title: t("menu"), link: "/menu" },
    { title: t("tables"), link: "/tables" },
  ];

  return (
    <nav className="bg-darkest shadow-lg border-b border-main/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo/Brand */}
          <button
            onClick={handleLogoClick}
            className="text-base sm:text-lg font-bold text-white hover:text-main transition-colors flex items-center gap-1.5 sm:gap-2 bg-transparent border-none cursor-pointer"
            title="Yao Yao Restaurant"
          >
            <IoPaw className="w-5 h-5 sm:w-6 sm:h-6 text-main" />
            <span className="hidden xs:inline sm:hidden md:inline">
              Yao Yao
            </span>
          </button>

          {/* Nav Links */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            {navData.map((item) => {
              const isActive =
                pathname === item.link ||
                (item.link !== "/" && pathname?.startsWith(item.link));

              return (
                <Link
                  key={item.title}
                  href={item.link}
                  className={`
                    px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all
                    ${
                      isActive
                        ? "bg-main text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {isVerified && (
              <div className="relative" ref={logoutRef}>
                <button
                  onClick={() => setShowLogout(!showLogout)}
                  className="px-2 sm:px-3 py-1.5 rounded-full bg-main/20 border border-main/40 text-main text-xs sm:text-sm font-medium hover:bg-main/30 transition-colors"
                >
                  Hii Yaoyao binch
                </button>
                {showLogout && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-main/20 overflow-hidden z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-darkest hover:bg-main/10 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            <LanguageSelector />
          </div>
        </div>
      </div>

      <AuthOverLay open={open} onClose={() => setOpen(false)} />
    </nav>
  );
};

export default NavBar;
