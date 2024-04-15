import { create } from 'zustand';
export type Workout = {
  id: number;
  title: string;
  image: { uri: string };
  min: number;
  kcal: number;
  select: boolean;
};


type Store = {
  visibleModal: boolean;
  voidVisibleModal: () => void;

  visibleModalDelete: boolean;
  voidVisibleModalDelete: () => void;

  visibleModalEdit: boolean;
  voidVisibleModalEdit: () => void;

  selectWorkout: Workout[];
  voidSelectWorkout: (items: Workout[]) => void;
};

export const useStore = create<Store>((set) => ({
  visibleModal: false,
  voidVisibleModal: () => set((state) => ({ visibleModal: !state.visibleModal })),

  visibleModalDelete: false,
  voidVisibleModalDelete: () => set((state) => ({ visibleModalDelete: !state.visibleModalDelete })),

  visibleModalEdit: false,
  voidVisibleModalEdit: () => set((state) => ({ visibleModalEdit: !state.visibleModalEdit })),

  selectWorkout: [],
  voidSelectWorkout: (items: Workout[]) => set({ selectWorkout: items }),
}));
