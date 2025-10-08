"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";
import LanguageSelector from "../common/LanguageSelector";
import useAuthStore, { AuthState } from "@/stores/useAuthStore";

const NavBar = () => {
  const pathname = usePathname();
  const t = useTranslations("common");

  const navData = [
    { title: t("home"), link: "/" },
    { title: t("menu"), link: "/menu" },
    { title: t("tables"), link: "/tables" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-lg font-bold text-slate-900 hover:text-slate-700 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Yao Yao
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navData.map((item) => {
              const isActive =
                pathname === item.link ||
                (item.link !== "/" && pathname?.startsWith(item.link));

              return (
                <Link
                  key={item.title}
                  href={item.link}
                  className={`
                    px-3 py-1.5 text-sm font-medium rounded-md transition-all
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }
                  `}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {useAuthStore((s: AuthState) => s.isVerified) && (
              <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                Hii Yaoyao binch
              </div>
            )}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
