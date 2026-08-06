import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";
import { Session } from "inspector/promises";

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
// checkSession

// export const checkServerSession = async () => {
//   const cookieStore = await cookies();
//   const res = await nextServer.get("/auth/session", {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });

//   return res.data;
// };

export const checkServerSession = async (): Promise<AxiosResponse<Session>> => {
  const cookieStore = await cookies();

  return nextServer.get<Session>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};