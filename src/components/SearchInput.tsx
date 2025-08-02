"use client";

import { Search } from "lucide-react";
import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

const SearchInput = ({ className, ...props }: SearchInputProps) => {
  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <Search size={16} className="absolute left-[16px] text-[#FFFFFF40]" />
      <input
        type="text"
        className={twMerge(
          "w-full rounded-[20px] border dark:border-[#FFFFFF0D] dark:bg-[#182031] p-[16px] h-[48px] pl-10 focus:outline-none",
          "placeholder:text-[#787879] dark:placeholder:text-[#535865]",
          "text-black dark:text-white",
          "text-[12px]",
        )}
        {...props}
      />
    </div>
  );
};

export default SearchInput;
