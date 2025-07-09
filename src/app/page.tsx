import AppThemeToggler from "@/components/AppThemeToggler";

export default function Home() {
  return (
    <span className="font-extrabold text-2xl dark:text-white text-yellow-50">
      Bem-vindo de volta :) <AppThemeToggler />
    </span>
  );
}
