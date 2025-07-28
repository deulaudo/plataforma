/**
 * Types related to endpoints for "Modo Exame"
 */

export type ExamMode = "STUDY" | "EXAM" | "FLASHCARDS";

export type ExamCategory = {
  id: string;
  name: string;
  examMode: boolean;
  courseMode: boolean;
  active: boolean;
  subcategories: {
    id: string;
    name: string;
    active: boolean;
    subcategoryId: string;
    questionsCount: number;
    questionsAnswered: number;
  }[];
};

export type ExamSubcategory = {
  id: string;
  name: string;
  active: boolean;
  subcategoryId: string;
  exams: {
    id: string;
    question: string;
    imageUrl: string;
    tags: string[];
    learnMore: string;
    learnMoreImageUrl: string;
    learnMoreVideoUrl: string;
    thumbnailVideoUrl: string;
    reference: string;
    ordering: number;
    active: boolean;
    cancelled: boolean;
    alternatives: string[];
    examAnswer: {
      id: string;
      correct: boolean;
      module: string;
      alternativeId: string;
    } | null;
  }[];
  questionsCount: number;
  questionsAnswered: number;
  correctQuestions: number;
  wrongQuestions: number;
  cancelledQuestions: number;
};
