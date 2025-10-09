import React, { useEffect, useState } from "react";
import { IoPaw } from "react-icons/io5";
import AuthOverLay from "./AuthOverLay";
import useAuthStore, { AuthState } from "@/stores/useAuthStore";

export interface YaoLogoProps {
  className?: string;
}

const YaoLogo = ({ className }: YaoLogoProps) => {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const isVerified = useAuthStore((s: AuthState) => s.isVerified);

  useEffect(() => {
    if (count === 0) return;
    const t = setTimeout(() => setCount(0), 2000);
    return () => clearTimeout(t);
  }, [count]);

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

  return (
    <div>
      <button
        onClick={handleLogoClick}
        className={`text-base sm:text-lg font-bold text-white hover:text-main transition-colors flex items-center gap-1.5 sm:gap-2 bg-transparent border-none cursor-pointer ${className}`}
        title="Yao Yao Restaurant"
      >
        <IoPaw className="w-5 h-5 sm:w-6 sm:h-6 text-main" />
        <span className="hidden xs:inline sm:hidden md:inline">Yao Yao</span>
      </button>

      <AuthOverLay open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default YaoLogo;
