import React, { useEffect, useState, useRef } from "react";
import { IoPaw } from "react-icons/io5";
import AuthOverLay from "./AuthOverLay";
import useAuthStore, { AuthState } from "@/stores/useAuthStore";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface YaoLogoProps {
  className?: string;
}

const YaoLogo = ({ className }: YaoLogoProps) => {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const isYaoyao = useAuthStore((s: AuthState) => s.isYaoyao);
  const pawRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (count === 0) return;
    const t = setTimeout(() => setCount(0), 2000);
    return () => clearTimeout(t);
  }, [count]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent navigation if already on home page
    if (pathname === "/") {
      e.preventDefault();
    }

    if (!isYaoyao) {
      const next = count + 1;
      setCount(next);

      if (pawRef.current) {
        const intensity = Math.min(next * 3, 15);
        gsap.to(pawRef.current, {
          x: intensity,
          duration: 0.1,
          yoyo: true,
          repeat: 3,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(pawRef.current, { x: 0 });
          },
        });

        const hueRotation = (next / 5) * 360;
        const scale = 1 + next * 0.1;

        gsap.to(pawRef.current, {
          filter: `hue-rotate(${hueRotation}deg)`,
          scale: scale,
          duration: 0.3,
          ease: "back.out(1.7)",
        });

        gsap.to(pawRef.current, {
          scale: 1,
          duration: 0.5,
          delay: 0.3,
          ease: "elastic.out(1, 0.5)",
        });
      }

      if (next >= 5) {
        if (pawRef.current && buttonRef.current) {
          gsap
            .timeline()
            .to(pawRef.current, {
              scale: 1.5,
              rotation: 360,
              filter: "hue-rotate(360deg) brightness(1.5)",
              duration: 0.5,
              ease: "back.out(2)",
            })
            .to(pawRef.current, {
              scale: 1,
              rotation: 0,
              filter: "hue-rotate(0deg) brightness(1)",
              duration: 0.3,
              ease: "elastic.out(1, 0.3)",
            });

          gsap.to(buttonRef.current, {
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
          });
        }

        // Store current path if not on home page
        if (pathname !== "/") {
          setRedirectPath(pathname);
        }

        setOpen(true);
        setCount(0);
      }
    }
  };

  return (
    <div>
      <Link
        href="/"
        ref={buttonRef}
        onClick={handleLogoClick}
        className={`text-base sm:text-lg font-bold text-white dark:text-slate-200 hover:text-main dark:hover:text-main transition-colors flex items-center gap-1.5 sm:gap-2 bg-transparent border-none cursor-pointer ${className}`}
        title="Yao Yao Restaurant"
      >
        <div ref={pawRef} className="inline-block">
          <IoPaw className="w-5 h-5 sm:w-6 sm:h-6 text-main" />
        </div>
        <span className="hidden xs:inline sm:hidden md:inline">Yao Yao</span>
      </Link>

      <AuthOverLay
        open={open}
        onClose={() => {
          setOpen(false);
          setRedirectPath(null);
        }}
        redirectPath={redirectPath}
      />
    </div>
  );
};

export default YaoLogo;
