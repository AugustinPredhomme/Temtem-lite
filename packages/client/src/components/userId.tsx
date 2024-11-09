import { create } from 'zustand';

interface UserIdStore {
  userId: number;
  setUserId: (value: number) => void;
}

const useUserIdStore = create<UserIdStore>((set) => ({
  userId: 0,
  setUserId: (value) => set({ userId: value }),
}));

export default useUserIdStore;