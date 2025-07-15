import { Loader } from "lucide-react";

import Logo from "./Logo";

const PageLoading = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <Logo />
      <Loader className="animate-spin text-[#3B82F6]" size={30} />
    </div>
  );
};

export default PageLoading;
