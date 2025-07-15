"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "next-themes";
import { PropsWithChildren, useEffect, useState } from "react";

type AuthCardProps = PropsWithChildren & {
  title: string;
  subtitle: string;
};

const AuthCard = ({ children, title, subtitle }: AuthCardProps) => {
  const { theme } = useTheme();
  const [logoImage, setLogoImage] = useState<string>(
    "/images/DeuLaudoLogoBlack.svg",
  );

  useEffect(() => {
    if (theme === "dark") {
      setLogoImage("/images/DeuLaudoLogoWhite.svg");
    } else {
      setLogoImage("/images/DeuLaudoLogoBlack.svg");
    }
  }, [theme]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[575px] p-[80px] rounded-[80px] bg-[#EDEEEF] dark:bg-[#141926] border border-[#0000000D] dark:border-[#FFFFFF0D]">
      <div className="flex flex-col gap-[80px] justify-center items-center mb-[80px]">
        <img src={logoImage} alt="DeuLaudo Logo" width={189} height={30.24} />
        <div className="flex flex-col gap-2 items-center">
          <span className="font-extrabold text-2xl text-[#2056F2]">
            {title}
          </span>
          <span className="font-medium text-xs text-black dark:text-white">
            {subtitle}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AuthCard;
