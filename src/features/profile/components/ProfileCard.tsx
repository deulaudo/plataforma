"use client";

import { twMerge } from "tailwind-merge";

import Button from "@/components/Button";
import ReadOnlyInput from "@/components/ReadOnlyInput";

const ProfileCard = () => {
  return (
    <div
      className={twMerge(
        "p-[80px] pb-[24px] dark:bg-[#141926] bg-[#EDEEEF]",
        "rounded-[80px] border border-[#0000000D] dark:border-[#FFFFFF0D]",
      )}
    >
      <div className="grid grid-cols-3 gap-x-8 gap-y-6">
        <ReadOnlyInput label="Nome" value="Deu Laudo" />
        <ReadOnlyInput label="Celular" value="(85) 98888-9999" />
        <ReadOnlyInput label="País" value="Brazil" />
        <ReadOnlyInput label="Estado" value="Ceará" />
        <ReadOnlyInput label="Cidade" value="Fortaleza" />
        <ReadOnlyInput label="Formação" value="Estudante" />
        <ReadOnlyInput label="Instituição" value="UFC" />
      </div>

      <div className="flex mt-6 justify-center">
        <Button theme="blue">Editar perfil</Button>
      </div>
    </div>
  );
};

export default ProfileCard;
