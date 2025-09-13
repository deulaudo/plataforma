"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthCard from "@/features/auth/components/AuthCard";
import { authService } from "@/services/authService";

const forgotPasswordSchema = z.object({
  email: z.string().email("E-mail inválido"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordMutation = useMutation<
    void,
    unknown,
    ForgotPasswordFormData
  >({
    mutationFn: async (data) => {
      await authService.recoverPassword(data);
    },
    onSuccess: () => {
      router.push("/auth/forgot-password/confirm");
      toast.success(
        "E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada.",
      );
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error("Erro ao recuperar senha. Tente novamente mais tarde.");
      }
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <AuthCard
      title="Recuperar senha"
      subtitle="Digite seu e-mail cadastrado para receber o código de recuperação de senha"
      className="max-w-[500px]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-[16px] w-full mb-[48px]">
          <Input
            icon={<Mail size={16} />}
            label="E-mail"
            placeholder="Ex: usuario@gmail.com"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="flex flex-col gap-[24px] w-full justify-center">
          <Button
            loading={forgotPasswordMutation.isPending}
            type="submit"
            theme="blue"
            disabled={forgotPasswordMutation.isPending}
          >
            Enviar
          </Button>

          <Button
            onClick={() => router.push("/auth/login")}
            theme="secondary"
            type="button"
          >
            Voltar
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};

export default ForgotPasswordPage;
