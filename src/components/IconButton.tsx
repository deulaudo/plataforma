import { cloneElement } from "react";

type IconButtonProps = {
  icon: React.ReactElement<{ className?: string; size?: number }>;
  onClick: () => void;
};

const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center min-w-[48px] h-[48px] rounded-[20px] dark:bg-[#192031] bg-[#0000000D] border border-[#0000000D] p-[3px] cursor-pointer"
    >
      {cloneElement(icon, {
        className: "text-[#767779] dark:text-[#E1E2F3]",
        size: 18,
      })}
    </div>
  );
};

export default IconButton;
