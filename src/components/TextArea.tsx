"use client";

import React, { TextareaHTMLAttributes, useId } from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  icon,
  error,
  resize = "vertical",
  rows = 4,
  ...props
}) => {
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
          "flex items-start text-xs relative w-full border border-[#FFFFFF0D] rounded-[20px] bg-white dark:bg-[#182031] p-[16px] min-h-[120px] placeholder:text-[#FFFFFF40]",
          error ? "border-red-500" : "",
        )}
      >
        {icon && (
          <div className="text-[#FFFFFF40] absolute left-[16px] top-[16px]">
            {icon}
          </div>
        )}

        <textarea
          id={randomId}
          rows={rows}
          {...props}
          className={twMerge(
            "w-full outline-0 bg-transparent text-black dark:text-white placeholder:text-dark",
            icon && "ml-[32px]",
            resize === "none" && "resize-none",
            resize === "vertical" && "resize-y",
            resize === "horizontal" && "resize-x",
            resize === "both" && "resize",
          )}
        />
      </div>

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default TextArea;
