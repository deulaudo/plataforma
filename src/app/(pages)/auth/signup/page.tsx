"use client";

import { Lock, Mail, Smartphone, User } from "lucide-react";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthCard from "@/features/auth/components/AuthCard";

const SignupPage = () => {
  const router = useRouter();

  return (
    <AuthCard
      title="Bem-vindo ao Deu Laudo"
      subtitle="Preencha seus dados para criar uma conta e entrar na nossa plataforma de ensino."
      className="max-w-[857px]"
    >
      <div className="grid grid-cols-2 gap-[16px] w-full mb-[48px]">
        <Input
          icon={<User size={16} />}
          label="Primeiro nome"
          placeholder="Ex: João"
        />
        <Input
          icon={<User size={16} />}
          label="Último nome"
          placeholder="Ex: Pontes"
        />

        <Input
          icon={<Smartphone size={16} />}
          label="Celular"
          placeholder="Ex: (00) 00000-0000"
          type="tel"
        />

        <Input
          icon={<Mail size={16} />}
          label="E-mail"
          placeholder="Ex: usuario@gmail.com"
          type="email"
        />

        <Input
          icon={<Lock size={16} />}
          label="Senha"
          placeholder="Digite aqui a sua senha"
          type="password"
        />

        <Input
          icon={<Lock size={16} />}
          label="Senha"
          placeholder="Digite aqui a sua senha"
          type="password"
        />
      </div>

      <div className="flex flex-col gap-[24px] w-full max-w-[336px] justify-center">
        <Button theme="blue">Criar conta</Button>

        <Button onClick={() => router.push("/auth/login")} theme="secondary">
          Fazer login
        </Button>
      </div>
    </AuthCard>
  );
};

export default SignupPage;
