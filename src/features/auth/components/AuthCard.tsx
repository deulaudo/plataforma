"use client";

/* eslint-disable @next/next/no-img-element */
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

import Logo from "@/components/Logo";

type AuthCardProps = PropsWithChildren & {
  title: string;
  subtitle: string;
  className?: string;
};

const AuthCard = ({ children, title, subtitle, className }: AuthCardProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center w-full max-w-[575px] p-[40px] md:p-[80px] rounded-[80px] bg-[#EDEEEF] dark:bg-[#141926] border border-[#0000000D] dark:border-[#FFFFFF0D]",
        className,
      )}
    >
      <div className="flex flex-col gap-[80px] justify-center items-center mb-[80px]">
        <Logo />
        <div className="flex flex-col gap-2 items-center">
          <span className="font-extrabold text-2xl text-[#2056F2]">
            {title}
          </span>
          <span className="max-w-[350] font-medium text-center text-sm text-black dark:text-white">
            {subtitle}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AuthCard;
