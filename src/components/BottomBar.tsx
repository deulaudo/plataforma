import { CardSim, Home, ListCheck, NotebookPen, Tv } from "lucide-react";
import { twMerge } from "tailwind-merge";

import Link from "next/link";
import { usePathname } from "next/navigation";

type BottomBarLinkProps = {
  name: string;
  icon: React.ReactNode;
  href: string;
  active: boolean;
};

const BottomBarLink = ({ name, icon, href, active }: BottomBarLinkProps) => {
  return (
    <Link href={href}>
      <div className="flex flex-col items-center gap-1">
        {icon}
        <span
          className={twMerge(
            "text-[10px] font-bold",
            active
              ? "text-[#2056F2]"
              : "dark:text-[#FFFFFF40] text-[#00000040]",
          )}
        >
          {name}
        </span>
      </div>
    </Link>
  );
};

const BottomBar = () => {
  const pathname = usePathname();

  const links = [
    {
      name: "Home",
      icon: <Home size={20} />,
      href: "/",
      active: pathname === "/",
    },
    {
      name: "Vídeo Aulas",
      icon: <Tv size={20} />,
      href: "/courses",
      active: pathname.startsWith("/courses"),
    },
    {
      name: "Modo Estudo",
      icon: <NotebookPen size={20} />,
      href: "/study-mode",
      active: pathname.startsWith("/study-mode"),
    },
    {
      name: "Modo Prova",
      icon: <ListCheck size={20} />,
      href: "/test-mode",
      active: pathname.startsWith("/test-mode"),
    },
    {
      name: "Flashcards",
      icon: <CardSim size={20} />,
      href: "/flashcards",
      active: pathname.startsWith("/flashcards"),
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-white dark:bg-[#141926] border-t border-[#0000000D] dark:border-[#FFFFFF0D]">
      <div className="flex items-center justify-around h-full px-6">
        {links.map((link) => (
          <BottomBarLink
            key={link.name}
            name={link.name}
            icon={link.icon}
            href={link.href}
            active={link.active}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
