/* eslint-disable no-console */
import { create } from "zustand";

import { authService } from "@/services/authService";
import { UserType } from "@/types/userType";

type AuthStoreType = {
  user: UserType | null;
  loadingUser: boolean;

  setUser: (user: UserType | null) => void;
  setLoadingUser: (loadingUser: boolean) => void;

  loadUser: () => Promise<void>;
  signOut: () => void;
};

export const useAuthStore = create<AuthStoreType>((set) => ({
  user: null,
  loadingUser: true,
  userProfile: null,

  setUser: (user) => set({ user }),
  setLoadingUser: (loadingUser) => set({ loadingUser }),

  loadUser: async () => {
    set({ loadingUser: true });
    try {
      const user = await authService.getAuthenticatedUser();
      set({ user, loadingUser: false });
    } catch (error) {
      set({ loadingUser: false });
    }
  },
  signOut: () => {
    try {
      authService.signOut();
      set({ user: null });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },
}));
