"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit3 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button";
import Input from "@/components/Input";
import PageLayout from "@/components/PageLayout";
import { customStudyService } from "@/services/customStudyService";

const editCustomStudySchema = z.object({
  name: z.string().min(1, "Nome do estudo é obrigatório"),
});

type EditCustomStudyFormData = z.infer<typeof editCustomStudySchema>;

const EditCustomStudyPage = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const studyId = params.id as string;

  // Buscar dados do estudo
  const { data: customStudy, isPending: isLoadingStudy } = useQuery({
    queryKey: ["custom-study", studyId],
    queryFn: () => customStudyService.getCustomStudyById(studyId),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditCustomStudyFormData>({
    resolver: zodResolver(editCustomStudySchema),
  });

  // Atualizar form quando os dados carregarem
  useEffect(() => {
    if (customStudy) {
      reset({ name: customStudy.name });
    }
  }, [customStudy, reset]);

  // Mutation para atualizar o nome
  const updateNameMutation = useMutation({
    mutationFn: (data: EditCustomStudyFormData) =>
      customStudyService.updateCustomStudyName({
        id: studyId,
        name: data.name,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["custom-study", studyId] });
      queryClient.invalidateQueries({ queryKey: ["custom-studies"] });
      router.push("/custom-study");
    },
  });

  const onSubmit = (data: EditCustomStudyFormData) => {
    updateNameMutation.mutate(data);
  };

  if (isLoadingStudy) {
    return (
      <PageLayout headerTitle="Editar Estudo" headerType="back">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2056F2] mx-auto mb-4"></div>
            <p className="text-sm dark:text-[#FFFFFF40] text-[#00000080]">
              Carregando estudo...
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!customStudy) {
    return (
      <PageLayout headerTitle="Estudo não encontrado" headerType="back">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-lg font-bold dark:text-white text-black mb-4">
              Estudo não encontrado
            </p>
            <Button onClick={() => router.push("/custom-study")} theme="blue">
              Voltar
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      headerTitle="Editar Estudo Personalizado"
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
              icon={<Edit3 size={16} />}
              label="Nome do estudo personalizado"
              placeholder="Ex: Revisão de Cardiologia"
              {...register("name")}
              error={errors.name?.message}
              highlightWhenFocused
            />
          </div>

          {/* Informações do Estudo */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold dark:text-white text-black">
              Informações do Estudo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#0000000D] dark:bg-[#FFFFFF0D] rounded-lg">
                <p className="text-xs dark:text-[#FFFFFF40] text-[#00000080] mb-1">
                  Total de Questões
                </p>
                <p className="text-lg font-bold dark:text-white text-black">
                  {customStudy.exams.length}
                </p>
              </div>
              <div className="p-4 bg-[#0000000D] dark:bg-[#FFFFFF0D] rounded-lg">
                <p className="text-xs dark:text-[#FFFFFF40] text-[#00000080] mb-1">
                  Questões Respondidas
                </p>
                <p className="text-lg font-bold dark:text-white text-black">
                  {customStudy.exams.filter((exam) => exam.examAnswer).length}
                </p>
              </div>
            </div>
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
              disabled={isSubmitting || updateNameMutation.isPending}
            >
              {isSubmitting || updateNameMutation.isPending
                ? "Salvando..."
                : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default EditCustomStudyPage;
