import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthState = {
  isVerified: boolean;
  setVerified: (v: boolean) => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (
      set: (
        partial: Partial<AuthState> | ((state: AuthState) => Partial<AuthState>)
      ) => void
    ) => ({
      isVerified: false,
      setVerified: (v: boolean) => set({ isVerified: v }),
    }),
    {
      name: "yaoyao-auth",
      partialize: (state: AuthState) => ({ isVerified: state.isVerified }),
    }
  )
);

export default useAuthStore;
