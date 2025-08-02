"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

export type TabItem = {
  id: string;
  label: string;
  content?: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  tabsClassName?: string;
  contentClassName?: string;
};

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  className,
  tabsClassName,
  contentClassName,
}) => {
  return (
    <div className={twMerge("w-full", className)}>
      {/* Tab Headers */}
      <div
        className={twMerge(
          "flex items-center gap-1 p-1 rounded-[24px] bg-[#F5F5F5] dark:bg-[#1F2937]",
          tabsClassName,
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={twMerge(
              "cursor-pointer",
              "flex-1 px-4 py-2 rounded-[20px] text-sm font-medium transition-all duration-200",
              "hover:bg-white/50 dark:hover:bg-white/10",
              activeTabId === tab.id
                ? "bg-white dark:bg-[#374151] text-[#2056F2] dark:text-white shadow-sm"
                : "text-[#6B7280] dark:text-[#9CA3AF]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={twMerge("mt-4", contentClassName)}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={twMerge(
              "transition-opacity duration-200",
              activeTabId === tab.id ? "block" : "hidden",
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
