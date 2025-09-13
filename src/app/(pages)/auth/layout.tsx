"use client";

import { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full overflow-y-auto">
      {children}
    </div>
  );
};

export default AuthLayout;
