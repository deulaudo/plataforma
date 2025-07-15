export interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
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
}

export interface Subscription {
  id: string;
  name: string;
}
