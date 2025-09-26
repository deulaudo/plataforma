import { CustomStudyType } from "@/types/customStudyType";

import api from "./api";

type ListCustomStudiesResponse = {
  id: string;
  name: string;
  questionsCount: number;
  questionsAnswered: number;
}[];

type CreateCustomStudyPayload = {
  name: string;
  tags: string[];
  productId: string;
};

async function listCustomStudies(): Promise<ListCustomStudiesResponse> {
  const response = await api.get<ListCustomStudiesResponse>(
    "/exam/customized-study",
  );
  return response.data;
}

async function getCustomStudyById(id: string): Promise<CustomStudyType> {
  const response = await api.get<CustomStudyType>(
    `/exam/customized-study/${id}`,
  );

  return response.data;
}

async function createCustomStudy(
  payload: CreateCustomStudyPayload,
): Promise<{ id: string; name: string }> {
  const { name, productId, tags } = payload;
  const response = await api.post<{ id: string; name: string }>(
    "/exam/customized-study",
    {
      name,
      tags,
    },
    {
      params: {
        product_id: payload.productId,
      },
    },
  );

  return response.data;
}

async function deleteCustomStudy(id: string): Promise<void> {
  await api.delete(`/exam/customized-study/${id}`);
}

async function updateCustomStudyName(params: {
  id: string;
  name: string;
}): Promise<{ name: string }> {
  const response = await api.put<{ name: string }>(
    `/exam/customized-study/${params.id}`,
    { name: params.name },
  );
  return response.data;
}

async function answerCustomStudyQuestion(params: {
  customStudyId: string;
  questionId: string;
  alternativeId: string;
}): Promise<void> {
  const { customStudyId, questionId, alternativeId } = params;
  await api.post(`/exam/customized-study/${customStudyId}/answer`, {
    examAnswer: [
      {
        questionId,
        alternativeId,
      },
    ],
  });
}

async function resetCustomStudyProgress(id: string): Promise<void> {
  await api.delete(`/exam/customized-study/${id}/reset-progress`);
}

export const customStudyService = {
  listCustomStudies,
  getCustomStudyById,
  createCustomStudy,
  updateCustomStudyName,
  deleteCustomStudy,
  answerCustomStudyQuestion,
  resetCustomStudyProgress,
};
