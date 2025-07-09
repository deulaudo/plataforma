"use client";

import { Lock, Mail } from "lucide-react";

import Link from "next/link";

import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthCard from "@/features/auth/components/AuthCard";

const LoginPage = () => {
  return (
    <AuthCard
      title="Bem-vindo de volta :)"
      subtitle="Preencha seus dados para entrar na plataforma"
    >
      <div className="flex flex-col gap-[16px] w-full mb-[48px]">
        <Input
          icon={
            <Mail className="text-[#808080] dark:text-[#4b4e56]" size={16} />
          }
          placeholder="Digite aqui o seu email"
          label="E-mail"
        />

        <Input
          type="password"
          icon={
            <Lock className="text-[#808080] dark:text-[#4b4e56]" size={16} />
          }
          placeholder="Digite aqui a sua senha"
          label="Senha"
        />

        <Link href={"/auth/forgot-password"} className="w-fit">
          <span className="w-fit font-medium text-xs text-[#000] dark:text-[#fff]">
            Esqueceu a sua senha?
          </span>
        </Link>
      </div>

      <div className="flex flex-col gap-[24px] w-full">
        <Button disabled theme="blue">
          Entrar
        </Button>

        <Button theme="secondary">Criar uma conta</Button>
      </div>
    </AuthCard>
  );
};

export default LoginPage;
