import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ClassroomStore {
	classroom: SessionData | null;
	isInSession: boolean;
	setClassroom: (classroom: SessionData) => void;
	setIsInSession: (isInSession: boolean) => void;
}

export const useClassroomStore = create<ClassroomStore>()(
	persist(
		(set) => ({
			classroom: null,
			isInSession: false,
			setClassroom: (classroom: SessionData) => set({ classroom }),
			setIsInSession: (isInSession: boolean) => set({ isInSession }),
		}),
		{
			name: "classroom-storage",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
