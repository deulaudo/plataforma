"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Lock, Mail } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import Link from "next/link";

import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthCard from "@/features/auth/components/AuthCard";
import { authService } from "@/services/authService";

const LoginFormSchema = z.object({
  email: z
    .email({
      error: "E-mail inválido",
    })
    .min(1, "E-mail é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginFormData = z.infer<typeof LoginFormSchema>;

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending: performingLogin } = useMutation<
    void,
    unknown,
    LoginFormData
  >({
    mutationFn: async (data) => {
      await authService.signIn(data);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("E-mail ou senha incorretos");
        } else {
          toast.error("Erro ao tentar fazer login");
        }
      }
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <AuthCard
      title="Bem-vindo de volta :)"
      subtitle="Preencha seus dados para entrar na plataforma"
    >
      <div className="flex flex-col gap-[16px] w-full mb-[48px]">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Input
              onChange={field.onChange}
              value={field.value}
              icon={
                <Mail
                  className="text-[#808080] dark:text-[#4b4e56]"
                  size={16}
                />
              }
              placeholder="Digite aqui o seu email"
              label="E-mail"
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Input
              onChange={field.onChange}
              value={field.value}
              type="password"
              icon={
                <Lock
                  className="text-[#808080] dark:text-[#4b4e56]"
                  size={16}
                />
              }
              placeholder="Digite aqui a sua senha"
              label="Senha"
              error={fieldState.error?.message}
            />
          )}
        />

        <Link href={"/auth/forgot-password"} className="w-fit">
          <span className="w-fit font-medium text-xs text-[#000] dark:text-[#fff]">
            Esqueceu a sua senha?
          </span>
        </Link>
      </div>

      <div className="flex flex-col gap-[24px] w-full">
        <Button
          loading={performingLogin}
          disabled={performingLogin}
          onClick={handleSubmit(onSubmit)}
          theme="blue"
        >
          Entrar
        </Button>

        <Button theme="secondary">Criar uma conta</Button>
      </div>
    </AuthCard>
  );
};

export default LoginPage;
