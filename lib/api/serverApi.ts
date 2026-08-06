import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

interface ServerSession {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  authenticated: boolean;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  note: string,
  page: number,
  category?: string | undefined,
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
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
  const cookieStore = await cookies();
  const { data } = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const res = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const checkServerSession = async (): Promise<AxiosResponse<ServerSession>> => {
  const cookieStore = await cookies();

  return nextServer.get<ServerSession>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};