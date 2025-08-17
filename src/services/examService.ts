import {
  ExamCategory,
  ExamMode,
  ExamSearchItem,
  ExamSubcategory,
} from "@/types/examType";

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

async function getExamSubcategoryById(data: {
  id: string;
  mode?: "STUDY" | "TEST";
}): Promise<ExamSubcategory> {
  const { id, mode } = data;
  const response = await api.get<ExamSubcategory>(`/exam/subcategory/${id}`, {
    params: {
      module: mode,
    },
  });
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

async function resetExamSubcategory(id: string, mode: ExamMode): Promise<void> {
  await api.delete(`/exam/subcategory/${id}/reset-exam-progress`, {
    params: {
      module: mode,
    },
  });
}

async function searchQuestions(params: {
  search: string;
  product_id?: string;
  perPage?: number;
  page?: number;
}): Promise<ExamSearchItem[]> {
  const response = await api.get<{ exams: ExamSearchItem[] }>("/exam", {
    params: {
      module: "STUDY",
      search: params.search,
      product_id: params.product_id,
      perPage: params.perPage || 10,
      page: params.page || 1,
    },
  });
  return response.data.exams;
}

export const examService = {
  listExamCategories,
  getExamCategoryById,
  getExamSubcategoryById,
  answerQuestion,
  resetExamSubcategory,
  searchQuestions,
};
