import Link from "next/link";
import React, { useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import LanguageSelectorMobile from "../common/LanguageSelectorMobile";
import { useTranslations } from "next-intl";

export interface NavProps {
  filteredNavData: { title: string; link: string; public: boolean }[];
  pathname: string | null;
  buildUrlWithParams: (link: string) => string;
  className?: string;
  isYaoyao: boolean;
  onLogout?: () => void;
  handleOnClick: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    active: boolean
  ) => void;
}

const NavMobile = ({
  filteredNavData,
  pathname,
  buildUrlWithParams,
  className,
  isYaoyao,
  onLogout,
  handleOnClick,
}: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("common");

  const onClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    active: boolean
  ) => {
    setIsOpen(false);
    handleOnClick(e, active);
  };

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white dark:text-slate-300 hover:bg-white/10 dark:hover:bg-slate-700 rounded-md transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-14 left-0 right-0 bg-darkest dark:bg-slate-900 border-t border-main/20 dark:border-slate-700 shadow-lg z-50">
          <div className="flex flex-col p-2 space-y-1">
            {/* Navigation Links */}
            {filteredNavData.map((item) => {
              const isActive = !!(
                pathname === item.link ||
                (item.link !== "/" && pathname?.startsWith(item.link))
              );

              return (
                <Link
                  key={item.title}
                  href={buildUrlWithParams(item.link)}
                  onClick={(e) => onClick(e, isActive)}
                  className={`
                      px-4 py-2.5 text-sm font-medium rounded-md transition-all
                      ${className} ${
                    isActive
                      ? "bg-main text-white dark:bg-main/90"
                      : "text-white/80 hover:bg-white/10 hover:text-white dark:text-slate-300 dark:hover:bg-slate-700"
                  }
                    `}
                >
                  {item.title}
                </Link>
              );
            })}

            {/* Language Selection Section */}
            <div className="pt-2 mt-2 border-t border-main/20 dark:border-slate-700">
              <div className="px-4 py-2 text-xs font-semibold text-white/60 dark:text-slate-400 uppercase tracking-wider">
                {t("language")}
              </div>
              <LanguageSelectorMobile
                onLanguageChange={() => setIsOpen(false)}
              />
            </div>
          </div>
          {isYaoyao && (
            <div className="flex items-center justify-between gap-3 px-2 py-2 border-t border-main/20 dark:border-slate-700">
              <button
                onClick={onLogout}
                className="w-full px-4 py-2.5 text-sm font-medium rounded-md transition-all text-red-400 hover:bg-red-500/10 hover:text-red-300 dark:text-red-400 dark:hover:bg-red-500/20"
              >
                {t("logout")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavMobile;
