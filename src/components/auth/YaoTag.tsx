import useAuthStore, { AuthState } from "@/stores/useAuthStore";
import { useEffect, useRef, useState } from "react";

export interface YaoTagProps {
  className?: string;
}

const YaoTag = ({ className }: YaoTagProps) => {
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef<HTMLDivElement>(null);
  const setVerified = useAuthStore((s: AuthState) => s.setVerified);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logoutRef.current &&
        !logoutRef.current.contains(event.target as Node)
      ) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setVerified(false);
    setShowLogout(false);
  };

  return (
    <div className={`relative ${className}`} ref={logoutRef}>
      <button
        onClick={() => setShowLogout(!showLogout)}
        className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-main/20 border border-main/40 text-main text-xs sm:text-sm font-medium hover:bg-main/30 transition-colors whitespace-nowrap"
      >
        要不要
      </button>
      {showLogout && (
        <div className="absolute right-0 mt-2 w-28 sm:w-32 bg-white rounded-md shadow-lg border border-main/20 overflow-hidden z-50">
          <button
            onClick={handleLogout}
            className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-darkest hover:bg-main/10 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default YaoTag;
