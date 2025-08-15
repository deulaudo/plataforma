"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { use, useMemo } from "react";

import PageLayout from "@/components/PageLayout";
import withAuth from "@/hocs/withAuth";
import { coursesService } from "@/services/coursesService";
import SearchInput from "@/components/SearchInput";

const ModulePage = ({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) => {
  const { moduleId } = use(params);

  const { data: module, isPending } = useQuery({
    queryKey: ["module"],
    queryFn: async () => {
      return await coursesService.getModule(moduleId);
    },
  });

  const HeaderTitle = useMemo(() => {
    return <div className="flex justify-start items-center w-full gap-[16px]">
      <span>Vídeo Aulas</span>
      <SearchInput placeholder="Pesquise por termos e questões" className="mr-[16px] ml-auto min-w-[400px]" />
    </div>
  }, []);

  return (
    <PageLayout
      headerType="back"
      headerTitle={HeaderTitle}
    >
      {isPending ? (
        <Loader className="animate-spin" />
      ) : (
        <>{module?.title}</>
      )}
    </PageLayout>
  );
};

export default withAuth(ModulePage);
