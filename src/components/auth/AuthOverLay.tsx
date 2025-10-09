"use client";
import React, { useEffect, useRef, useState } from "react";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { PASSWORD } from "@/config/app";

const AuthOverLay: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { setIsVerified } = useYaoAuth();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setValue("");
      setError("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const submit = () => {
    if (value === PASSWORD) {
      setIsVerified(true);
      onClose();
    } else {
      setError("Incorrect password");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative bg-white rounded-lg p-4 sm:p-6 w-full max-w-sm mx-auto shadow-xl">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-600 hover:text-slate-900 text-xl sm:text-2xl"
        >
          ✕
        </button>

        <h3 className="text-base sm:text-lg font-semibold mb-2">
          Verify YaoYao
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          Yaoyao is a purple puppy — enter the password.
        </p>

        <input
          ref={inputRef}
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            if (e.key === "Backspace") setValue((s) => s.slice(0, -1));
          }}
          className="w-full border rounded-md px-3 py-2 mb-3 text-sm sm:text-base"
          placeholder="Start typing password..."
        />

        {error && (
          <div className="text-red-600 text-xs sm:text-sm mb-2">{error}</div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 sm:py-2 rounded-md text-sm sm:text-base hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-3 py-1.5 sm:py-2 rounded-md bg-main hover:bg-main/90 text-white text-sm sm:text-base transition-colors"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthOverLay;
