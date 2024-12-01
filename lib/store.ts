import { create } from "zustand";

type State = {
  click: number;
  isAnimDone: boolean;
  token: string;
};

type Actions = {
  incrementClick: () => void;
  decrementClick: () => void;
  finishAnimation: () => void;
};

export const useStore = create<State & Actions>((set) => ({
  click: 0,
  isAnimDone: false,
  token: "",
  incrementClick: () => set((state) => ({ click: state.click + 1 })),
  decrementClick: () => set((state) => ({ click: state.click - 1 })),
  finishAnimation: () => set((state) => ({ isAnimDone: true })),
  setToken: (newToken: string) => set((state) => ({ token: newToken })),
}));
