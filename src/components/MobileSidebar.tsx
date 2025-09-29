"use client";

import {
  BookKey,
  CardSim,
  Home,
  ListCheck,
  LogOut,
  NotebookPen,
  Tv,
  User,
  Workflow,
  X,
} from "lucide-react";
import { JSX, cloneElement } from "react";
import { twMerge } from "tailwind-merge";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import ProductSelect from "@/features/products/components/ProductSelect";
import { useSelectedProduct } from "@/hooks/useSelectedProduct";
import { useAuthStore } from "@/stores/authStore";
import { ProductType } from "@/types/productType";

import Logo from "./Logo";

type LinkProps = {
  name: string;
  icon: JSX.Element;
  href: string;
  active: boolean;
  onClick?: () => void;
};

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SidebarLink = ({ name, icon, href, active, onClick }: LinkProps) => {
  return (
    <Link href={href} onClick={onClick}>
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

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { selectedProduct } = useSelectedProduct();
  const { user, signOut } = useAuthStore();

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
      enabled: (product: ProductType) => product.modes.exam,
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
    {
      name: "Estudo Personalizado",
      icon: <BookKey />,
      href: "/custom-study",
      active: () => pathname === "/custom-study",
      enabled: (product: ProductType) => product.modes.exam,
    },
  ];

  const handleProfileClick = () => {
    router.push("/profile");
    onClose();
  };

  const handleSignOut = () => {
    signOut();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={twMerge(
          "fixed top-0 left-0 h-full w-[280px] dark:bg-[#141926] bg-[#EDEEEF] z-50 transform transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-[#0000000D] dark:border-[#FFFFFF0D]">
            <Logo />
            <button onClick={onClose} className="p-2">
              <X size={20} className="dark:text-[#FFFFFF40] text-[#00000080]" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 p-6">
            <div className="flex flex-col gap-[16px]">
              <ProductSelect label="Produto Selecionado" />

              {links.map((link) => {
                if (user?.role === "ADMIN") {
                  return (
                    <SidebarLink
                      key={link.name}
                      name={link.name}
                      icon={link.icon}
                      href={link.href}
                      active={link.active()}
                      onClick={onClose}
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
                      onClick={onClose}
                    />
                  );
                }
              })}
            </div>
          </div>

          {/* User Account Section */}
          <div className="p-6 border-t border-t-[#0000000D] dark:border-t-[#FFFFFF0D]">
            {/* User Info */}
            <div className="flex gap-2 items-center mb-4">
              <img
                src="/images/DefaultAvatar.png"
                className="w-[32px] h-[32px] rounded-[12px]"
                alt="User Avatar"
              />
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-bold text-[12px] dark:text-white text-black">
                  {user?.name}
                </span>
                <span className="font-medium text-[12px] dark:text-[#FFFFFF40]">
                  {user?.email}
                </span>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleProfileClick}
                className="flex gap-2 items-center p-2 rounded-lg hover:bg-[#0000000D] dark:hover:bg-[#FFFFFF0D] transition-colors"
              >
                <User
                  size={16}
                  className="dark:text-[#FFFFFF40] text-[#00000080]"
                />
                <span className="text-sm dark:text-white text-black">
                  Perfil
                </span>
              </button>
              <button
                onClick={handleSignOut}
                className="flex gap-2 items-center p-2 rounded-lg hover:bg-[#0000000D] dark:hover:bg-[#FFFFFF0D] transition-colors"
              >
                <LogOut
                  size={16}
                  className="dark:text-[#FFFFFF40] text-[#00000080]"
                />
                <span className="text-sm dark:text-white text-black">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
