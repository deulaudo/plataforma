"use client";

import { CardSim, Home, ListCheck, NotebookPen, Tv } from "lucide-react";
import { JSX, cloneElement } from "react";
import { twMerge } from "tailwind-merge";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "./Logo";

type LinkProps = {
  name: string;
  icon: JSX.Element;
  href: string;
  active: boolean;
};

const SidebarLink = ({ name, icon, href, active }: LinkProps) => {
  return (
    <Link href={href}>
      <div
        className={twMerge(
          "flex gap-[8px] items-center p-[12px] rounded-[16px]",
          active ? "dark:bg-[#0055EE1A] bg-[#0000000D]" : "bg-transparent",
        )}
      >
        {cloneElement(icon, {
          size: 18,
          className: `${active ? "text-[#2056F2]" : "dark:text-[#FFFFFF40] text-[#00000080]"}`,
        })}
        <span
          className={`text-[12px] ${
            active
              ? "dark:text-white text-black font-bold"
              : "dark:text-[#FFFFFF40]"
          }`}
        >
          {name}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    {
      name: "Home",
      icon: <Home />,
      href: "/",
      active: () => pathname === "/",
    },
    {
      name: "Vídeo Aulas",
      icon: <Tv />,
      href: "/courses",
      active: () => pathname.startsWith("/courses"),
    },
    {
      name: "Modo Estudo",
      icon: <NotebookPen />,
      href: "/study",
      active: () => pathname.startsWith("/study"),
    },
    {
      name: "Modo Prova",
      icon: <ListCheck />,
      href: "/exams",
      active: () => pathname.startsWith("/exams"),
    },
    {
      name: "Flashcards",
      icon: <CardSim />,
      href: "/flashcards",
      active: () => pathname.startsWith("/flashcards"),
    },
  ];

  return (
    <aside className="w-[260px] h-full dark:bg-[#141926] bg-[#EDEEEF] p-6">
      <Logo />

      <div className="flex flex-col gap-[16px] mt-[32px]">
        {links.map((link) => (
          <SidebarLink
            key={link.name}
            name={link.name}
            icon={link.icon}
            href={link.href}
            active={link.active()}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
