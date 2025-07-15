"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Logo = () => {
  const { theme } = useTheme();
  const [logoImage, setLogoImage] = useState<string>(
    "/images/DeuLaudoLogoWhite.svg",
  );

  useEffect(() => {
    if (theme === "light") {
      setLogoImage("/images/DeuLaudoLogoBlack.svg");
    } else {
      setLogoImage("/images/DeuLaudoLogoWhite.svg");
    }
  }, [theme]);

  return (
    <img
      src={logoImage}
      alt="DeuLaudo Logo"
      width={189}
      height={30.24}
      className="w-[189px] h-[30.24px]"
    />
  );
};

export default Logo;
