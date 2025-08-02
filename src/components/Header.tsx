"use client";

/* eslint-disable @next/next/no-img-element */
import { ArrowLeft } from "lucide-react";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/authStore";

import AppThemeToggler from "./AppThemeToggler";

type HeaderProps = {
  headerTitle?: string;
  headerType?: "welcome" | "back";
};

const Header = ({ headerTitle, headerType }: HeaderProps) => {
  const { user } = useAuthStore();
  const { back } = useRouter();

  return (
    <header className="flex w-full">
      <div className="flex-1">
        {headerType === "welcome" ? (
          <div className="flex items-center gap-[16px]">
            <img
              src="/images/Duzinho.png"
              alt="Logo"
              className="h-[64px] w-[64px]"
            />
            <h1 className="text-[24px] font-bold">
              Bem-vindo(a) de volta,{" "}
              <span className="text-[#2056F2]">{user?.name} :)</span>
            </h1>
          </div>
        ) : headerType === "back" ? (
          <div className="flex gap-4 items-center">
            <ArrowLeft className="cursor-pointer" onClick={back} />
            <h1 className="text-2xl font-bold">{headerTitle}</h1>
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-[16px]">
        <AppThemeToggler />
      </div>
    </header>
  );
};

export default Header;
