"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const AppThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Prevents hydration mismatch by not rendering the component until mounted
    return null;
  }

  return (
    <div className="flex flex-col">
      The current theme is: {theme}
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
  );
};

export default AppThemeToggler;
