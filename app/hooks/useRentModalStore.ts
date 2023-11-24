import { create } from "zustand";

type RentModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useRentModalStore = create<RentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModalStore;
