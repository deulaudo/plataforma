import api from "./api";

type ExamDashboardResponse = {
  totalQuestions: number;
  totalQuestionsAnsweredByUser: number;
  totalCorrectQuestionsByUser: number;
  totalCorrectQuestions: number;
  totalWrongQuestionsByUser: number;
};

type ExamHistoryResponse = {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  } | null;
  questionsAnswered: number;
  questionsCount: number;
}[];

async function examDashboard(params: { module: "STUDY" | "TEST" }) {
  const response = await api.get<ExamDashboardResponse>(
    `/platform/exam-dashboard?module=${params.module}`,
  );
  return response.data;
}

async function examHistory() {
  const response = await api.get<ExamHistoryResponse>(
    `/platform/exam-history?module=TEST`,
  );
  return response.data.filter((test) => test.questionsAnswered > 0);
}

export const statisticsService = {
  examDashboard,
  examHistory,
};
