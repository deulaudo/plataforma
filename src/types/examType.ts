/**
 * Types related to endpoints for "Modo Exame"
 */

export type ExamMode = "STUDY" | "TEST" | "FLASHCARDS";

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

export type ExamSubcategoryQuestion = {
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
  alternatives: {
    id: string;
    correct: boolean;
    text: string;
  }[];
  examAnswer: {
    id: string;
    correct: boolean;
    module: string;
    alternativeId: string;
  } | null;
};

export type ExamSubcategory = {
  id: string;
  name: string;
  active: boolean;
  subcategoryId: string;
  exams: ExamSubcategoryQuestion[];
  questionsCount: number;
  questionsAnswered: number;
  correctQuestions: number;
  wrongQuestions: number;
  cancelledQuestions: number;
};

export type ExamSearchItem = {
  id: string;
  question: string;
  ordering: number;
  learnMore: string;
  cancelled: boolean;
  subcategory: {
    id: string;
    name: string;
    category: {
      name: string;
    };
  };
  alternatives: {
    id: string;
    text: string;
    correct: boolean;
    createdAt: string;
  }[];
  tags: {
    id: string;
    tag: string;
    createdAt: string;
    updatedAt: string;
  }[];
  examAnswer: {
    id: string;
    correct: boolean;
    module: string;
    alternativeId: string;
  } | null;
};
