"use client";

import { LogOut, MessageCircle } from "lucide-react";

import Button from "@/components/Button";
import { useAuthStore } from "@/stores/authStore";

const NoProductPage = () => {
  const { signOut } = useAuthStore();

  const handleContactSupport = () => {
    // Aqui você pode implementar a lógica para contatar o suporte
    // Por exemplo, abrir um modal de contato, redirecionar para WhatsApp, etc.
    window.open("mailto:suporte@deulaudo.com.br", "_blank");
  };

  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
      {/* Ícone ilustrativo */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
        <MessageCircle
          size={48}
          className="text-orange-600 dark:text-orange-400"
        />
      </div>

      {/* Título e descrição */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold dark:text-white text-black">
          Nenhum produto adquirido
        </h1>
        <p className="max-w-md text-lg text-gray-600 dark:text-gray-300">
          Você ainda não possui nenhum produto ativo em sua conta. Entre em
          contato com nosso suporte para adquirir um produto e ter acesso
          completo à plataforma.
        </p>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Button theme="blue" fullWidth onClick={handleContactSupport}>
          <div className="flex items-center gap-2">
            <MessageCircle size={16} />
            Entrar em contato com suporte
          </div>
        </Button>

        <Button theme="secondary" fullWidth onClick={signOut}>
          <div className="flex items-center gap-2">
            <LogOut size={16} />
            Sair da aplicação
          </div>
        </Button>
      </div>

      {/* Informações de contato adicionais */}
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>Ou entre em contato pelo WhatsApp:</p>
        <a
          href="https://wa.me/5551920024719"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          +55 (51) 92002-4719
        </a>
      </div>
    </div>
  );
};

export default NoProductPage;
