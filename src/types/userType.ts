export interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "USER";
  active: boolean;
  confirmationCode: string | null;
  subscription: Subscription;
  products: {
    id: string;
    name: string;
    modes: {
      flashcards: boolean;
      exam: boolean;
      course: boolean;
    };
    status: string;
    expirateAt: string;
  }[];
  statistics: {
    totalQuestionsAnswered: number;
    completedFlashcards: number;
    daysStudiedConsecutively: number;
    percentageQuestionsCorrect: number;
    percentageVideosWatched: number;
    totalQuestionsAnsweredToday: number;
  };
}

export interface Subscription {
  id: string;
  name: string;
}
