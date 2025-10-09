import Link from "next/link";
import React from "react";
import { NavProps } from "./NavMobile";

export interface NavLinksProps {
  className?: string;
}

const NavPC = ({
  filteredNavData,
  pathname,
  buildUrlWithParams,
  className,
}: NavProps) => {
  return (
    <>
      <div className="hidden sm:flex items-center gap-0.5">
        {filteredNavData.map((item) => {
          const isActive =
            pathname === item.link ||
            (item.link !== "/" && pathname?.startsWith(item.link));

          return (
            <Link
              key={item.title}
              href={buildUrlWithParams(item.link)}
              className={`
                    px-1.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-sm font-medium rounded-md transition-all whitespace-nowrap
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
    </>
  );
};

export default NavPC;
