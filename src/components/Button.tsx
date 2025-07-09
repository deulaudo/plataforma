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
        return "bg-[#1d58df] text-white hover:bg-[#1d58df]/90 disabled:bg-[#14233c] disabled:text-[#476d93] disabled:cursor-not-allowed";
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
        "cursor-pointer font-bold text-xs",
        getButtonTheme(),
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
