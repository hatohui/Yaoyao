import { PASSWORD } from "@/config/app";
import { useEffect, useRef } from "react";
import useAuthStore, { AuthState } from "@/stores/useAuthStore";

const useYaoAuth = () => {
  const isVerified = useAuthStore((s: AuthState) => s.isVerified);
  const setIsVerified = useAuthStore((s: AuthState) => s.setVerified);
  const secret = useRef("");

  useEffect(() => {
    if (isVerified) return;

    const keyTracker = (e: KeyboardEvent) => {
      const key = typeof e.key === "string" ? e.key : undefined;

      if (key === "Enter") {
        if (secret.current === PASSWORD) {
          setIsVerified(true);
          document.removeEventListener("keydown", keyTracker);
        }
        secret.current = "";
        return;
      }
      if (key === "Backspace") {
        secret.current = secret.current.slice(0, -1);
        return;
      }

      // Only handle single-character printable keys
      if (key && key.length === 1) {
        const nextSecret = secret.current + key;
        if (secret.current.length === 0) {
          if (key === PASSWORD[0]) {
            secret.current = key;
          } else {
            secret.current = "";
          }
        } else {
          if (PASSWORD.startsWith(nextSecret)) {
            secret.current = nextSecret;
          } else {
            secret.current = "";
          }
        }
      }
    };

    document.addEventListener("keydown", keyTracker);
    return () => {
      document.removeEventListener("keydown", keyTracker);
    };
  }, [isVerified, setIsVerified]);

  return { isVerified, setIsVerified };
};

export default useYaoAuth;
