"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Lock, Mail, Smartphone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthCard from "@/features/auth/components/AuthCard";
import { authService } from "@/services/authService";

const confirmForgotPasswordSchema = z.object({
  code: z.string().min(2, "Código deve ter pelo menos 2 caracteres"),
  password: z.string().min(2, "Senha deve ter pelo menos 6 caracteres"),
});

type ConfirmForgotPasswordFormData = z.infer<
  typeof confirmForgotPasswordSchema
>;

const ConfirmForgotPasswordPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmForgotPasswordFormData>({
    resolver: zodResolver(confirmForgotPasswordSchema),
  });

  const confirmForgotPasswordMutation = useMutation<
    void,
    unknown,
    ConfirmForgotPasswordFormData
  >({
    mutationFn: async (data) => {
      try {
        const { confirmationToken } =
          await authService.validateConfirmationCode({
            confirmationCode: data.code,
          });

        await authService.createPassword({
          confirmationToken,
          newPassword: data.password,
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            "Erro ao resetar senha. Verifique o código e tente novamente.",
          );

          throw error;
        }
      }
    },
    onSuccess: () => {
      router.push("/auth/login");
      toast.success("Senha resetada com sucesso! Agora você já pode logar.");
    },
  });

  const onSubmit = async (data: ConfirmForgotPasswordFormData) => {
    confirmForgotPasswordMutation.mutate(data);
  };

  return (
    <AuthCard
      title="Recuperar senha"
      subtitle="Entre com o código de validação enviado para o seu e-mail"
      className="max-w-[500px]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-[16px] w-full mb-[48px]">
          <Input
            icon={<User size={16} />}
            label="Código de confirmação"
            placeholder="Ex: 244433"
            {...register("code")}
            error={errors.code?.message}
          />

          <Input
            icon={<Lock size={16} />}
            label="Escolha sua nova senha"
            placeholder="********"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        <div className="flex flex-col gap-[24px] w-full justify-center">
          <Button
            loading={confirmForgotPasswordMutation.isPending}
            type="submit"
            theme="blue"
            disabled={confirmForgotPasswordMutation.isPending}
          >
            Salvar
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

export default ConfirmForgotPasswordPage;
