"use client";

import withAuth from "@/hocs/withAuth";
import withSomeProduct from "@/hocs/withProduct";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default withSomeProduct(withAuth(ProtectedLayout));
