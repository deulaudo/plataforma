import { Lock, Mail } from "lucide-react";

import Input from "@/components/Input";
import AuthCard from "@/features/auth/components/AuthCard";

const LoginPage = () => {
  return (
    <AuthCard
      title="Bem-vindo de volta :)"
      subtitle="Preencha seus dados para entrar na plataforma"
    >
      <div className="flex flex-col gap-[16px] w-full">
        <Input
          icon={<Mail size={16} />}
          placeholder="Digite aqui o seu email"
          label="E-mail"
        />

        <Input
          type="password"
          icon={<Lock size={16} />}
          placeholder="Digite aqui a sua senha"
          label="Senha"
        />
      </div>
    </AuthCard>
  );
};

export default LoginPage;
