import React, { PropsWithChildren } from "react";

import BottomBar from "./BottomBar";
import Header from "./Header";
import MobileNavbar from "./MobileNavbar";
import Sidebar from "./Sidebar";

type PageLayoutProps = PropsWithChildren & {
  headerTitle?: string | React.ReactElement;
  headerType?: "welcome" | "back";
  backAction?: () => void;
};

const PageLayout = ({
  children,
  headerTitle,
  headerType,
  backAction,
}: PageLayoutProps) => (
  <div className="flex w-full">
    {/* Desktop Sidebar */}
    <div className="hidden md:block">
      <Sidebar />
    </div>

    {/* Mobile Navbar */}
    <MobileNavbar />

    {/* Main Content */}
    <div className="flex flex-col flex-1">
      <div className="flex flex-col gap-[48px] flex-1 p-6 md:p-6 mt-[64px] md:mt-0 mb-[64px] md:mb-0 overflow-y-auto">
        <Header
          headerTitle={headerTitle}
          headerType={headerType}
          backAction={backAction}
        />
        <div className="flex-1">{children}</div>
      </div>
    </div>

    {/* Mobile Bottom Bar */}
    <BottomBar />
  </div>
);

export default PageLayout;
