"use client";
import React from "react";
import LanguageSelector from "../common/LanguageSelector";
import YaoTag from "../auth/YaoTag";
import YaoLogo from "../auth/AuthLogo";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import NavMobile from "./NavMobile";
import NavPc from "./NavPC";
import useAuthStore, { AuthState } from "@/stores/useAuthStore";

const NavBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("common");
  const { isVerified } = useYaoAuth();
  const setVerified = useAuthStore((s: AuthState) => s.setVerified);

  const navData = [
    { title: t("home"), link: "/", public: true },
    { title: t("menu"), link: "/menu", public: true },
    { title: t("tables"), link: "/tables", public: true },
    { title: t("dashboard"), link: "/dashboard", public: false },
  ];

  // Function to build URL with preserved search params
  const buildUrlWithParams = (link: string) => {
    const params = searchParams?.toString();
    return params ? `${link}?${params}` : link;
  };

  const filteredNavData = navData.filter((item) => item.public || isVerified);

  const handleLogout = () => {
    setVerified(false);
  };

  return (
    <nav className="bg-darkest shadow-lg border-b border-main/20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <YaoLogo />
          <div className="flex-1 flex justify-center sm:justify-center">
            <NavPc
              buildUrlWithParams={buildUrlWithParams}
              filteredNavData={filteredNavData}
              isVerified={isVerified}
              pathname={pathname}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {isVerified && <YaoTag />}
            <div className="sm:flex hidden">
              <LanguageSelector />
            </div>
          </div>
          <NavMobile
            buildUrlWithParams={buildUrlWithParams}
            filteredNavData={filteredNavData}
            isVerified={isVerified}
            pathname={pathname}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
