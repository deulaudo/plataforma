"use client";

import React, { PropsWithChildren, useState } from "react";

import Header from "./Header";
import MobileNavbar from "./MobileNavbar";
import MobileSidebar from "./MobileSidebar";
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
}: PageLayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleMobileMenuClick = () => {
    setIsMobileSidebarOpen(true);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex w-full">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Navbar */}
      <MobileNavbar onMenuClick={handleMobileMenuClick} />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={handleMobileSidebarClose}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col gap-[48px] flex-1 p-6 md:p-6 mt-[64px] md:mt-0 md:overflow-y-auto">
          <Header
            headerTitle={headerTitle}
            headerType={headerType}
            backAction={backAction}
          />
          <div className="flex flex-col flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
