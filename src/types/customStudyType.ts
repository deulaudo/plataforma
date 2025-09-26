export type CustomStudyType = {
  id: string;
  name: string;
  exams: {
    id: string;
    question: string;
    imageUrl: string | null;
    learnMore: string | null;
    learnMoreImageUrl: string | null;
    reference: string | null;
    cancelled: boolean;
    alternatives: {
      id: string;
      text: string;
      correct: boolean;
    }[];
    examAnswer: {
      id: string;
      correct: boolean;
      alternativeId: string;
    };
  }[];
};

export type CustomStudyQuestion = CustomStudyType["exams"][number];
