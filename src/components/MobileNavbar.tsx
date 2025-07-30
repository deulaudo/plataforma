import Logo from "./Logo";

const MobileNavbar = () => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-[64px] bg-white dark:bg-[#141926] border-b border-[#0000000D] dark:border-[#FFFFFF0D] z-10">
      <div className="flex items-center h-full px-6">
        <Logo />
      </div>
    </div>
  );
};

export default MobileNavbar;
