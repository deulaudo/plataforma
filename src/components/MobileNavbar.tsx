"use client";

import { Menu } from "lucide-react";

import Logo from "./Logo";

type MobileNavbarProps = {
  onMenuClick: () => void;
};

const MobileNavbar = ({ onMenuClick }: MobileNavbarProps) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-[64px] bg-white dark:bg-[#141926] border-b border-[#0000000D] dark:border-[#FFFFFF0D] z-10">
      <div className="flex items-center justify-between h-full px-6">
        <button onClick={onMenuClick} className="p-2">
          <Menu size={20} className="dark:text-[#FFFFFF40] text-[#00000080]" />
        </button>
        <Logo />
        <div className="w-8" /> {/* Spacer for center alignment */}
      </div>
    </div>
  );
};

export default MobileNavbar;
