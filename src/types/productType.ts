export type ProductType = {
  id: string;
  name: string;
  price: number;
  accessTime: number;
  modes: ProductMode;
  categories: ProductCategory[];
};

type ProductCategory = {
  id: string;
  name: string;
};

type ProductMode = {
  flashcards: boolean;
  exam: boolean;
  course: boolean;
};
