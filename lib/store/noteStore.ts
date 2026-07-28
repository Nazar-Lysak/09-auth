import { NoteTag } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type InitialDraft = {
  title: string;
  content: string;
  tag: NoteTag;
};

type NoteStore = {
  draft: InitialDraft;
  setDraft: (draft: Partial<InitialDraft>) => void;
  clearDraft: () => void;
};

const initialDraft: InitialDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (data) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ...data,
          },
        })),

      clearDraft: () =>
        set({
          draft: initialDraft,
        }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({
        draft: state.draft,
      }),
    },
  ),
);
