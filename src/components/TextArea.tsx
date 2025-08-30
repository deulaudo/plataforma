"use client";

import React, { TextareaHTMLAttributes, forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, icon, error, ...props }, ref) => {
    const randomId = useId();

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
            "flex items-center text-xs relative w-full border border-[#FFFFFF0D] rounded-[20px] bg-[#0000000D] dark:bg-transparent placeholder:text-[#FFFFFF40]",
            error ? "border-red-500" : "",
          )}
        >
          {icon && (
            <div className="text-[#FFFFFF40] absolute left-[16px]">{icon}</div>
          )}

          <textarea
            id={randomId}
            ref={ref}
            {...props}
            className={`resize-none font-medium p-4 w-full h-[88px] gap-2.5 rounded-[20px] outline-0 ${icon && "ml-[32px]"}`}
          />
        </div>

        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
