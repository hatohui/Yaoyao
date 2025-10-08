"use client";
import React, { useEffect, useState } from "react";
import AuthOverLay from "./AuthOverLay";
import { IoPaw } from "react-icons/io5";

const AuthTrigger: React.FC = () => {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (count === 0) return;
    const t = setTimeout(() => setCount(0), 3000);
    return () => clearTimeout(t);
  }, [count]);

  const handleClick = () => {
    const next = count + 1;
    setCount(next);
    if (next >= 5) {
      setOpen(true);
      setCount(0);
    }
  };

  return (
    <>
      <button
        type="button"
        title="A little secret"
        aria-label="Open verification"
        onClick={handleClick}
        className="relative p-1.5 sm:p-2 rounded-full focus:outline-none hover:bg-slate-50 transition-colors"
        style={{ cursor: "default" }}
      >
        <span className="sr-only">Open verification</span>
        <IoPaw
          className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 opacity-40"
          aria-hidden
        />
      </button>

      <AuthOverLay open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default AuthTrigger;
