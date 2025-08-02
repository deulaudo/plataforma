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
