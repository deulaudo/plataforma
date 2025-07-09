import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  theme?: "green" | "blue" | "secondary";
};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const getButtonTheme = () => {
    switch (props.theme) {
      case "green":
        return "bg-[#1bb86c] text-white hover:bg-[#1bb86c]/90";
      case "blue":
        return `
          bg-[radial-gradient(circle_at_center,_#1c52e2,_#001a66)]
          bg-blend-overlay
          before:content-[''] before:absolute before:inset-0
          before:bg-[repeating-radial-gradient(circle,rgba(255,255,255,0.015)_0,rgba(255,255,255,0.015)_1px,transparent_1px,transparent_3px)]
          before:opacity-30
          before:pointer-events-none
          text-white
          relative
          hover:brightness-110
          disabled:opacity-50
          disabled:hover:brightness-100
          disabled:cursor-not-allowed
        `;
      case "secondary":
        return "bg-[#dddfe6] text-black dark:bg-[#4e5973] dark:text-white hover:bg-[#dddfe6]/90 dark:hover:bg-[#4e5973]/90";
      default:
        return "bg-[#dddfe6] text-black dark:bg-[#4e5973] dark:text-white hover:bg-[#dddfe6]/90 dark:hover:bg-[#4e5973]/90";
    }
  };

  return (
    <button
      className={twMerge(
        "flex items-center justify-center min-w-[336px] h-[47px] rounded-[200px] py-[16px] px-[24px]",
        "cursor-pointer font-bold text-xs transition-all duration-200",
        getButtonTheme(),
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
