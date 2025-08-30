export type FlashcardCardSubcategoryType = {
  id: string;
  name: string;
  active: boolean;
  childSubcategories: FlashcardCardSubcategoryType[];
  subcategoriesChildsCount: number;
  questionsCount: number;
  questionsDone: number;
  reviews: number;
  reviewsDone: number;
};

export type FlashcardCategoryType = {
  id: string;
  name: string;
  examMode: boolean;
  courseMode: boolean;
  active: boolean;
  subcategories: FlashcardCardSubcategoryType[];
  subcategoriesCount: number;
  subcategoryDone: number;
};

export type FlashcardQuestionType = {
  id: string;
  question: string;
  imageUrl: string | null;
  reference: string | null;
  flashcardsDiscarted: string[];
  active: boolean;
  answer: {
    id: string;
    answer: string;
    imageUrl: string | null;
  };
  subcategory: {
    id: string;
    name: string;
    category: {
      id: string;
      name: string;
    };
  };
};

export type FlashcardDeckType = {
  id: string;
  name: string;
  active: boolean;
  subcategoryId: string;
  questions: FlashcardQuestionType[];
  totalQuestions: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  hasReview: true;
};

export type FlashcardReviewType = {
  id: string;
  revisionDate: string;
  done: boolean;
  delayed: boolean;
  reviewCycle: number;
  hashId: string;
  subcategory: {
    id: string;
    name: string;
    questionsCount: number;
    questionsDone: number;
    reviews: number;
    reviewsDone: number;
  };
};
