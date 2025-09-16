"use client";

import {
  CardSim,
  Home,
  ListCheck,
  NotebookPen,
  Tv,
  Workflow,
} from "lucide-react";
import { JSX, cloneElement } from "react";
import { twMerge } from "tailwind-merge";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ProductSelect from "@/features/products/components/ProductSelect";
import { useSelectedProduct } from "@/hooks/useSelectedProduct";
import { useAuthStore } from "@/stores/authStore";
import { ProductType } from "@/types/productType";

import Logo from "./Logo";
import UserAccountMenu from "./UserAccountMenu";

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
  const { selectedProduct } = useSelectedProduct();
  const { user } = useAuthStore();

  const links = [
    {
      name: "Home",
      icon: <Home />,
      href: "/",
      active: () => pathname === "/",
      enabled: () => true,
    },
    // {
    //   name: "Trilhas",
    //   icon: <Workflow />,
    //   active: () => pathname.startsWith("/tracks"),
    //   href: "/tracks",
    //   enabled: (product: ProductType) => product.modes.course,
    // },
    {
      name: "Vídeo Aulas",
      icon: <Tv />,
      href: "/courses",
      active: () => pathname.startsWith("/courses"),
      enabled: (product: ProductType) => product.modes.course,
    },
    {
      name: "Modo Estudo",
      icon: <NotebookPen />,
      href: "/study-mode",
      active: () => pathname.startsWith("/study-mode"),
      enabled: () => true,
    },
    {
      name: "Modo Prova",
      icon: <ListCheck />,
      href: "/test-mode",
      active: () => pathname.startsWith("/test-mode"),
      enabled: (product: ProductType) => product.modes.exam,
    },
    {
      name: "Flashcards",
      icon: <CardSim />,
      href: "/flashcards",
      active: () => pathname.startsWith("/flashcards"),
      enabled: (product: ProductType) => product.modes.flashcards,
    },
  ];

  return (
    <aside className="flex flex-col w-[260px] h-full dark:bg-[#141926] bg-[#EDEEEF]">
      <div className="p-6 flex-1">
        <Logo />

        <div className="flex flex-col gap-[16px] mt-[32px] flex-1">
          <ProductSelect />

          {links.map((link) => {
            if (user?.role === "ADMIN") {
              return (
                <SidebarLink
                  key={link.name}
                  name={link.name}
                  icon={link.icon}
                  href={link.href}
                  active={link.active()}
                />
              );
            }

            if (selectedProduct && link.enabled(selectedProduct)) {
              return (
                <SidebarLink
                  key={link.name}
                  name={link.name}
                  icon={link.icon}
                  href={link.href}
                  active={link.active()}
                />
              );
            }
          })}
        </div>
      </div>

      <div className="p-[16px] border-t border-t-[#202531]">
        <UserAccountMenu />
      </div>
    </aside>
  );
};

export default Sidebar;
