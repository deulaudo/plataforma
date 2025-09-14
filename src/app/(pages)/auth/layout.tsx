"use client";

import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center min-h-screen w-full overflow-y-auto">
      {children}
    </div>
  );
}
