"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Smartphone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthCard from "@/features/auth/components/AuthCard";

const confirmSignupSchema = z.object({
  code: z.string().min(2, "Código deve ter pelo menos 2 caracteres"),
  password: z.string().min(2, "Senha deve ter pelo menos 6 caracteres"),
});

type ConfirmSignupFormData = z.infer<typeof confirmSignupSchema>;

const ConfirmSignupPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmSignupFormData>({
    resolver: zodResolver(confirmSignupSchema),
  });

  const onSubmit = async (data: ConfirmSignupFormData) => {
    try {
      // Aqui você pode implementar a lógica de criação da conta
      // console.log("Form data:", data);
    } catch (error) {
      // console.error("Erro ao criar conta:", error);
    }
  };

  return (
    <AuthCard
      title="Bem-vindo ao Deu Laudo"
      subtitle="Preencha seus dados para criar uma conta e entrar na nossa plataforma de ensino."
      className="max-w-[857px]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-[16px] w-full mb-[48px]">
          <Input
            icon={<User size={16} />}
            label="Nome completo"
            placeholder="Ex: João"
            {...register("code")}
            error={errors.name?.message}
          />

          <Input
            icon={<Mail size={16} />}
            label="E-mail"
            placeholder="Ex: usuario@gmail.com"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            icon={<Smartphone size={16} />}
            label="Celular"
            placeholder="Ex: (00) 00000-0000"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>

        <div className="flex flex-col gap-[24px] w-full justify-center">
          <Button type="submit" theme="blue" disabled={isSubmitting}>
            {isSubmitting ? "Criando conta..." : "Criar conta"}
          </Button>

          <Button
            onClick={() => router.push("/auth/login")}
            theme="secondary"
            type="button"
          >
            Fazer login
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};

export default ConfirmSignupPage;
