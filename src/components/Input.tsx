"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { InputHTMLAttributes, useId, useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  icon,
  type,
  error,
  ...props
}) => {
  const randomId = useId();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={randomId}
          className={twMerge(
            "font-bold text-xs text-black dark:text-white",
            error ? "text-red-500" : "",
          )}
        >
          {label}
        </label>
      )}
      <div
        className={twMerge(
          "flex items-center text-xs relative w-full border border-[#FFFFFF0D] rounded-[20px] bg-white dark:bg-transparent p-[16px] h-[48px] placeholder:text-[#FFFFFF40]",
          error ? "border-red-500" : "",
        )}
      >
        {icon && (
          <div className="text-[#FFFFFF40] absolute left-[16px]">{icon}</div>
        )}

        <input
          id={randomId}
          type={inputType}
          {...props}
          className={`h-[48px] w-full outline-0 ${icon && "ml-[32px]"} ${isPassword ? "pr-[40px]" : ""}`}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            className="cursor-pointer absolute right-[16px] text-[#FFFFFF40] focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default Input;
