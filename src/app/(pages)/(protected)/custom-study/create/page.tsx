"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Check, Plus, Tag, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Input from "@/components/Input";
import PageLayout from "@/components/PageLayout";
import { useSelectedProduct } from "@/hooks/useSelectedProduct";
import { customStudyService } from "@/services/customStudyService";
import { tagService } from "@/services/tagService";
import { TagType } from "@/types/tagType";

const createCustomStudySchema = z.object({
  name: z.string().min(1, "Nome do estudo é obrigatório"),
  selectedTags: z.array(z.string()).min(1, "Selecione pelo menos uma tag"),
});

type CreateCustomStudyFormData = z.infer<typeof createCustomStudySchema>;

const TagBadge = ({
  tag,
  isSelected,
  onToggle,
}: {
  tag: TagType;
  isSelected: boolean;
  onToggle: (tagId: string) => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(tag.id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
        isSelected
          ? "bg-[#2056F2] border-[#2056F2] text-white"
          : "bg-transparent border-[#0000000D] dark:border-[#FFFFFF0D] dark:text-white text-black hover:border-[#2056F2]"
      }`}
    >
      <Tag size={14} />
      <span className="text-sm font-medium">{tag.tag}</span>
      {isSelected && <Check size={14} />}
    </button>
  );
};

const CreateCustomStudyPage = () => {
  const router = useRouter();
  const { selectedProduct } = useSelectedProduct();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: tags, isPending } = useQuery({
    queryKey: ["tags", selectedProduct?.id],
    queryFn: async () => {
      if (!selectedProduct) return [];
      return tagService.listTags({ productId: selectedProduct?.id });
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCustomStudyFormData>({
    resolver: zodResolver(createCustomStudySchema),
    defaultValues: {
      name: "",
      selectedTags: [],
    },
  });

  const handleTagToggle = (tagId: string) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];

    setSelectedTags(newSelectedTags);
    setValue("selectedTags", newSelectedTags);
  };

  const onSubmit = async (data: CreateCustomStudyFormData) => {
    try {
      if (!selectedProduct) return;

      await customStudyService.createCustomStudy({
        name: data.name,
        tags: data.selectedTags,
        productId: selectedProduct.id,
      });

      router.push("/custom-study");
    } catch (error) {
      // Handle error - you could show a toast notification here
    }
  };

  if (isPending) {
    return (
      <PageLayout headerTitle="Criar Estudo Personalizado" headerType="back">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2056F2] mx-auto mb-4"></div>
            <p className="text-sm dark:text-[#FFFFFF40] text-[#00000080]">
              Carregando tags...
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      headerTitle="Criar Estudo Personalizado"
      headerType="back"
      backAction={() => router.push("/custom-study")}
    >
      <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* Nome do Estudo */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold dark:text-white text-black">
              Nome do Estudo
            </h2>
            <Input
              icon={<Plus size={16} />}
              label="Nome do estudo personalizado"
              placeholder="Ex: Revisão de Cardiologia"
              {...register("name")}
              error={errors.name?.message}
              highlightWhenFocused
            />
          </div>

          {/* Seleção de Tags */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold dark:text-white text-black">
              Selecionar Temas
            </h2>
            <p className="text-sm dark:text-[#FFFFFF40] text-[#00000080]">
              Escolha as tags que deseja incluir no seu estudo personalizado
            </p>

            <Controller
              name="selectedTags"
              control={control}
              render={() => (
                <div className="flex flex-col gap-4">
                  {tags && tags.length > 0 ? (
                    <>
                      <div className="flex flex-wrap gap-3">
                        {tags.map((tag) => (
                          <TagBadge
                            key={tag.id}
                            tag={tag}
                            isSelected={selectedTags.includes(tag.id)}
                            onToggle={handleTagToggle}
                          />
                        ))}
                      </div>

                      {selectedTags.length > 0 && (
                        <div className="mt-4 p-4 bg-[#0000000D] dark:bg-[#FFFFFF0D] rounded-lg">
                          <p className="text-sm font-medium dark:text-white text-black mb-2">
                            Tags selecionadas ({selectedTags.length}):
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedTags.map((tagId) => {
                              const tag = tags.find((t) => t.id === tagId);
                              return tag ? (
                                <span
                                  key={tagId}
                                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#2056F2] text-white text-xs rounded-full"
                                >
                                  {tag.tag}
                                  <button
                                    type="button"
                                    onClick={() => handleTagToggle(tagId)}
                                    className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                                  >
                                    <X size={12} />
                                  </button>
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-sm dark:text-[#FFFFFF40] text-[#00000080]">
                        Nenhuma tag disponível para este produto
                      </p>
                    </div>
                  )}
                </div>
              )}
            />

            {errors.selectedTags && (
              <span className="text-red-500 text-xs">
                {errors.selectedTags.message}
              </span>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
            <Button
              type="button"
              theme="secondary"
              onClick={() => router.push("/custom-study")}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              theme="blue"
              disabled={isSubmitting || selectedTags.length === 0}
              loading={isSubmitting}
            >
              {isSubmitting ? "Criando..." : "Criar Estudo"}
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default CreateCustomStudyPage;
