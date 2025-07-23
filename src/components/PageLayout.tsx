import { PropsWithChildren } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

type PageLayoutProps = PropsWithChildren & {
  headerTitle?: string;
  headerType?: "welcome" | "back";
};

const PageLayout = ({ children, headerTitle, headerType }: PageLayoutProps) => (
  <div className="flex w-full">
    <Sidebar />
    <div className="flex flex-col gap-[48px] flex-1 p-6">
      <Header headerTitle={headerTitle} headerType={headerType} />
      {children}
    </div>
  </div>
);

export default PageLayout;
