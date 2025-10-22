"use client";
import React from "react";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

const ToggleSwitch = ({
  checked,
  onChange,
  label,
  disabled = false,
}: ToggleSwitchProps) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
      />
      <div
        className={`relative w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer-focus:ring-4 peer-focus:ring-main/30 dark:peer-focus:ring-main/30 peer-checked:bg-main transition-colors ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
      )}
    </label>
  );
};

export default ToggleSwitch;
