import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export interface NavLinksProps {
  className?: string;
}

const NavLinks = ({ className }: NavLinksProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("common");

  const navData = [
    { title: t("home"), link: "/" },
    { title: t("menu"), link: "/menu" },
    { title: t("tables"), link: "/tables" },
  ];

  // Function to build URL with preserved search params
  const buildUrlWithParams = (link: string) => {
    const params = searchParams?.toString();
    return params ? `${link}?${params}` : link;
  };

  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      {navData.map((item) => {
        const isActive =
          pathname === item.link ||
          (item.link !== "/" && pathname?.startsWith(item.link));

        return (
          <Link
            key={item.title}
            href={buildUrlWithParams(item.link)}
            className={`
                    px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all
                    ${className} ${
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
  );
};

export default NavLinks;
