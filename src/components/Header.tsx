"use client";

/* eslint-disable @next/next/no-img-element */
import { ArrowLeft } from "lucide-react";
import React from "react";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/authStore";

import AppThemeToggler from "./AppThemeToggler";

type HeaderProps = {
  headerTitle?: string | React.ReactElement;
  headerType?: "welcome" | "back";
  backAction?: () => void;
};

const Header = ({ headerTitle, headerType, backAction }: HeaderProps) => {
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
            <ArrowLeft
              className="cursor-pointer"
              onClick={() => {
                if (backAction) {
                  backAction();
                } else {
                  back();
                }
              }}
            />
            <h1 className="text-2xl font-bold w-full">{headerTitle}</h1>
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
