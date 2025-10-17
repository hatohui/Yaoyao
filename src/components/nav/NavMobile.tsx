import Link from "next/link";
import React, { useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import LanguageSelector from "../common/LanguageSelector";
import { useTranslations } from "next-intl";

export interface NavProps {
  filteredNavData: { title: string; link: string; public: boolean }[];
  pathname: string | null;
  buildUrlWithParams: (link: string) => string;
  className?: string;
  isVerified: boolean;
  onLogout?: () => void;
}

const NavMobile = ({
  filteredNavData,
  pathname,
  buildUrlWithParams,
  className,
  isVerified,
  onLogout,
}: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("common");

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
          <div className="flex flex-col p-2">
            {filteredNavData.map((item) => {
              const isActive =
                pathname === item.link ||
                (item.link !== "/" && pathname?.startsWith(item.link));

              return (
                <Link
                  key={item.title}
                  href={buildUrlWithParams(item.link)}
                  onClick={() => setIsOpen(false)}
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
          </div>
          {isVerified && (
            <div className="flex items-center justify-between gap-3 px-2 py-2 border-t border-main/20 dark:border-slate-700">
              <button
                onClick={onLogout}
                className="px-4 py-2.5 text-sm font-medium rounded-md transition-all text-white/80 hover:bg-white/10 hover:text-white dark:text-slate-300 dark:hover:bg-slate-700"
              >
                {t("logout")}
              </button>
              <LanguageSelector />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavMobile;
