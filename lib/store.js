import { create } from "zustand";

// stage: 'intro' -> planet waiting to be touched
//        'transition' -> planet bursting / camera pushing in
//        'galaxy' -> full photo galaxy, orbit controls active
export const useGalaxyStore = create((set) => ({
  stage: "intro",
  selectedPhoto: null,
  setStage: (stage) => set({ stage }),
  selectPhoto: (selectedPhoto) => set({ selectedPhoto }),
}));
