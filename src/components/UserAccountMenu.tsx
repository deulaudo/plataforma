"use client";

/* eslint-disable @next/next/no-img-element */
import { ChevronLeft, ChevronRight, LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/authStore";

const UserAccountMenu = () => {
  const { user, signOut } = useAuthStore();
  const router = useRouter();
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpened) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpened(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpened]);

  return (
    <div className="flex gap-2 items-center relative" ref={containerRef}>
      <img
        src="/images/DefaultAvatar.png"
        className="w-[32px] h-[32px] rounded-[12px]"
        alt="User Avatar"
      />

      <div className="flex flex-col gap-1 flex-1">
        <span className="font-bold text-[14px] dark:text-white text-black">
          {user?.name.split(" ")[0]}
        </span>
        <span className="font-medium text-[12px] dark:text-[#FFFFFF40]">
          {user?.email}
        </span>
      </div>

      <div className="cursor-pointer">
        {isMenuOpened ? (
          <ChevronLeft
            className="dark:text-[#FFFFFF40] text-black"
            onClick={() => setIsMenuOpened(false)}
          />
        ) : (
          <ChevronRight
            className="dark:text-[#FFFFFF40] text-black"
            onClick={() => setIsMenuOpened(true)}
          />
        )}
      </div>

      {isMenuOpened && (
        <div className="flex flex-col gap-3 absolute left-[250px] bottom-[-10px] w-[200px] bg-white dark:bg-[#141926] border border-[#EDEEEF] dark:border-[#202531] rounded-lg shadow-lg p-4">
          <div
            onClick={() => router.push("/profile")}
            className="cursor-pointer flex gap-2 items-center"
          >
            <User size={16} />
            <span className="text-sm">Perfil</span>
          </div>
          <div
            className="cursor-pointer flex gap-2 items-center"
            onClick={signOut}
          >
            <LogOut size={16} />
            <span className="text-sm">Sair</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccountMenu;
