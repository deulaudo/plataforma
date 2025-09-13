"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Mail, Smartphone, User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "react-toastify";
import { z } from "zod";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Input from "@/components/Input";
import InputPhone from "@/components/InputPhone";
import AuthCard from "@/features/auth/components/AuthCard";
import { authService } from "@/services/authService";

const signupSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine((value) => isValidPhoneNumber(value), {
      message: "Número de telefone inválido",
    }),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const signUpMutation = useMutation<void, unknown, SignupFormData>({
    mutationFn: async (data) => {
      await authService.signUp(data);
    },
    onSuccess: () => {
      router.push("/auth/signup/confirm");
      toast.success(
        "Conta criada com sucesso! Verifique seu e-mail para completar o seu cadastro.",
      );
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast.error(
            "Já existe uma conta cadastrada com esse e-mail. Caso tenha esquecido sua senha, utilize a opção de recuperação.",
          );
        } else {
          toast.error("Erro ao criar conta. Tente novamente mais tarde.");
        }
      }
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    signUpMutation.mutate(data);
  };

  return (
    <AuthCard
      title="Crie sua conta"
      subtitle="Ao realizar o cadastro, você receberá um e-mail com um código de confirmação"
      className="max-w-[857px]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-[16px] w-full mb-[48px]">
          <Input
            icon={<User size={16} />}
            label="Nome completo"
            placeholder="Ex: João"
            {...register("name")}
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

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputPhone
                icon={<Smartphone size={16} />}
                label="Celular"
                placeholder="(11) 99999-9999"
                value={field.value}
                onChange={field.onChange}
                error={errors.phone?.message}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-[24px] w-full justify-center">
          <Button
            loading={signUpMutation.isPending}
            type="submit"
            theme="blue"
            disabled={signUpMutation.isPending}
          >
            Criar conta
          </Button>

          <Button
            onClick={() => router.push("/auth/login")}
            theme="secondary"
            type="button"
          >
            Já possui uma conta? Clique aqui
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};

export default SignupPage;
