import { PASSWORD } from "@/config/app";
import { useEffect, useRef, useState } from "react";

const useYaoAuth = () => {
  const [isVerified, setIsVerified] = useState(false);
  const secret = useRef("");

  useEffect(() => {
    if (isVerified) return;

    const keyTracker = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (secret.current === PASSWORD) {
          setIsVerified(true);
          document.removeEventListener("keydown", keyTracker);
        }
        secret.current = "";
        return;
      }
      if (e.key === "Backspace") {
        secret.current = secret.current.slice(0, -1);
        return;
      }
      if (e.key.length === 1) {
        const nextSecret = secret.current + e.key;
        if (secret.current.length === 0) {
          if (e.key === PASSWORD[0]) {
            secret.current = e.key;
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
  }, [isVerified]);

  return { isVerified, setIsVerified };
};

export default useYaoAuth;
