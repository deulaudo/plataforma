import { ExamCategory, ExamMode, ExamSubcategory } from "@/types/examType";

import api from "./api";

type ListExamCategoriesResponse = {
  id: "string";
  name: "string";
  examMode: boolean;
  courseMode: boolean;
  active: boolean;
  subcategoriesCount: number;
  subcategoryDone: number;
}[];

async function listExamCategories(params?: {
  module: ExamMode;
  product_id?: string;
}): Promise<ListExamCategoriesResponse> {
  const response = await api.get<ListExamCategoriesResponse>("/exam/category", {
    params,
  });
  return response.data;
}

async function getExamCategoryById(id: string): Promise<ExamCategory> {
  const response = await api.get<ExamCategory>(`/exam/category/${id}`);
  return response.data;
}

async function getExamSubcategoryById(id: string): Promise<ExamSubcategory> {
  const response = await api.get<ExamSubcategory>(`/exam/subcategory/${id}`);
  return response.data;
}

async function answerQuestion(data: {
  questionId: string;
  alternativeId: string;
  mode: "STUDY" | "TEST";
}): Promise<void> {
  await api.post(`/exam/${data.mode.toLowerCase()}-answer`, {
    examAnswer: [
      {
        questionId: data.questionId,
        alternativeId: data.alternativeId,
      },
    ],
  });
}

export const examService = {
  listExamCategories,
  getExamCategoryById,
  getExamSubcategoryById,
  answerQuestion,
};
