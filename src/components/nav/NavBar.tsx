"use client";
import React, { useEffect } from "react";
import LanguageSelector from "../common/LanguageSelector";
import DarkModeToggle from "../common/DarkModeToggle";
import YaoTag from "../auth/YaoTag";
import YaoLogo from "../auth/AuthLogo";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import NavMobile from "./NavMobile";
import NavPc from "./NavPC";
import useAuthStore, { AuthState } from "@/stores/useAuthStore";
import { buildUrlWithParams } from "@/utils/params/buildUrlWithParams";
import Loading from "../common/Loading";
import { LAYOUT_PUBLIC_ENABLED } from "@/config/app";

const NavBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("common");
  const { isYaoyao } = useYaoAuth();
  const setVerified = useAuthStore((s: AuthState) => s.setVerified);
  const [loading, setLoading] = React.useState(false);

  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    active: boolean
  ) => {
    if (!active) {
      e.stopPropagation();
      setLoading(true);
    }
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navData = [
    { title: t("home"), link: "/", public: true },
    { title: t("layout"), link: "/layout", public: LAYOUT_PUBLIC_ENABLED },
    { title: t("menu"), link: "/menu", public: true },
    { title: t("tables"), link: "/tables", public: true },
    { title: t("feedback"), link: "/feedback", public: true },
    { title: t("dashboard"), link: "/dashboard", public: false },
  ];

  const buildNavUrl = (link: string) => {
    return buildUrlWithParams(link, searchParams);
  };

  const filteredNavData = navData.filter((item) => item.public || isYaoyao);

  const handleLogout = () => {
    setVerified(false);
  };

  return (
    <nav className="fixed z-40 top-0 inset-0 nav-height w-screen bg-darkest dark:bg-slate-900 shadow-lg border-b border-main/20 dark:border-main/40">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <YaoLogo />
          <div className="flex-1 flex justify-center sm:justify-center">
            <NavPc
              buildUrlWithParams={buildNavUrl}
              filteredNavData={filteredNavData}
              isYaoyao={isYaoyao}
              pathname={pathname}
              handleOnClick={handleOnClick}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {isYaoyao && <YaoTag />}
            <DarkModeToggle />
            <div className="sm:flex hidden">
              <LanguageSelector />
            </div>
          </div>
          <NavMobile
            buildUrlWithParams={buildNavUrl}
            filteredNavData={filteredNavData}
            isYaoyao={isYaoyao}
            pathname={pathname}
            handleOnClick={handleOnClick}
            onLogout={handleLogout}
          />
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loading />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
