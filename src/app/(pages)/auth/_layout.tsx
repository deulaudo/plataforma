"use client";

import { PropsWithChildren } from "react";

import withNoAuth from "@/hocs/withNoAuth";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      {children}
    </div>
  );
};

export default AuthLayout;
