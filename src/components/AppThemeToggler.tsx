"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const AppThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    // Prevents hydration mismatch by not rendering the component until mounted
    return null;
  }

  return (
    <div
      onClick={toggleTheme}
      className="flex items-center justify-center w-[48px] h-[48px] rounded-[20px] dark:bg-[#192031] bg-[#0000000D] border border-[#0000000D] p-[3px] cursor-pointer"
    >
      {theme === "light" ? (
        <Moon className="text-[#767779] dark:text-[#E1E2F3]" size={16} />
      ) : (
        <Sun className="text-[#767779] dark:text-[#E1E2F3]" size={16} />
      )}
    </div>
  );
};

export default AppThemeToggler;
