"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

import Button from "@/components/Button";
import Input from "@/components/Input";
import InputPhone from "@/components/InputPhone";
import ReadOnlyInput from "@/components/ReadOnlyInput";
import { profileService } from "@/services/profileService";
import { useAuthStore } from "@/stores/authStore";

const ProfileCard = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [userValues, setUserValues] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
  });

  const updateProfileMutation = useMutation<
    unknown,
    unknown,
    { name: string; phone: string }
  >({
    mutationFn: (data) => profileService.updateProfile(data),
    onSuccess: () => {
      toast.success("Perfil atualizado com sucesso!");
      setUserValues(formData);
    },
    onError: () => {
      toast.error("Erro ao atualizar perfil. Tente novamente.");
    },
    onSettled: () => {
      setIsEditing(false);
    },
  });

  const handleSave = () => {
    updateProfileMutation.mutate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reverte os dados para os valores originais
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  return (
    <div
      className={twMerge(
        "p-[80px] pb-[24px] dark:bg-[#141926] bg-[#EDEEEF]",
        "rounded-[80px] border border-[#0000000D] dark:border-[#FFFFFF0D]",
      )}
    >
      <div className="flex flex-col gap-4">
        {isEditing ? (
          <Input
            label="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        ) : (
          <ReadOnlyInput label="Nome" value={userValues.name} />
        )}

        {isEditing ? (
          <InputPhone
            label="Celular"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: String(e) })}
          />
        ) : (
          <ReadOnlyInput label="Celular" value={userValues.phone || ""} />
        )}
      </div>

      <div className="flex flex-col mt-6 justify-center gap-4">
        {isEditing ? (
          <>
            <Button
              loading={updateProfileMutation.isPending}
              theme="blue"
              onClick={handleSave}
            >
              Salvar
            </Button>
            <Button theme="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          </>
        ) : (
          <Button theme="blue" onClick={() => setIsEditing(true)}>
            Editar perfil
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
