import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  note: string,
  page: number,
  category?: string | undefined,
): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get("/notes", {
    params: {
      search: note,
      page,
      perPage: 10,
      tag: category,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

// getMe
export const getMe = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};
// checkSession

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.success;
};
