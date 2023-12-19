import { create } from "zustand";

type SearchModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useSearchModalStore = create<SearchModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModalStore;
