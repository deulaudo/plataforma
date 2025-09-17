"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

import { customStudyService } from "@/services/customStudyService";

import CustomStudyCard from "./CustomStudyCard";

const CustomStudyList = () => {
  const { data, isPending } = useQuery({
    queryKey: ["customStudyList"],
    queryFn: async () => {
      const response = await customStudyService.listCustomStudies();
      return response;
    },
  });

  if (isPending) {
    return <Loader className="animate-spin text-[#3B82F6]" size={30} />;
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {data?.map((customStudy) => (
        <CustomStudyCard key={customStudy.id} {...customStudy} />
      ))}
    </div>
  );
};

export default CustomStudyList;
