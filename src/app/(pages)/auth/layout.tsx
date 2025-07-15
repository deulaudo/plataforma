import { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      {children}
    </div>
  );
};

export default AuthLayout;
