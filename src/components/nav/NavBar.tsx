import Link from "next/link";
import React from "react";
import LanguageSelector from "../common/LanguageSelector";

const NavBar = () => {
  const navData = [
    { title: "Home", link: "/" },
    { title: "Menu", link: "/menu" },
  ];

  return (
    <div className="flex w-dvw items-center justify-between">
      <div className="text-lg font-semibold">NavBar</div>
      <nav className="flex gap-4">
        {navData.map((item) => (
          <Link key={item.title} href={item.link}>
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <LanguageSelector />
      </div>
    </div>
  );
};

export default NavBar;
