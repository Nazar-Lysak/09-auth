import axios from "axios";
import type { Note, NoteTag } from "../../types/note";
import { nextServer } from "./api";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number
}

interface HandleSubmitInterface {
  title: string;
  content: string;
  tag: NoteTag;
  category?: string;
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const API_URL = "https://notehub-api.goit.study";
// const API_LOGIN = "/auth/login";
// const API_REGISTER = "/auth/register";
// const API_LOGOUT = "/auth/logout";
// const API_SESSION = "/auth/session";
// const API_ME = "/users/me";
// const API_NOTEST = "/notes";
// const API_CREATE_NOTE = "/notes";
// const API_DELETE_NOTES = "/notes";
// const API_CURRENT_NOTE = "/notes/:id";

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get(`/notes/${id}`);

  return data;
}





export const fetchNotes = async (note: string, page: number, category?: string | undefined): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get("/notes", {
    params: {
      search: note,
      page,
      perPage: 10,
      tag: category
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  console.log(id)
  const { data } = await nextServer.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
};

export const createNote = async (note: HandleSubmitInterface): Promise<Note> => {
  const { data } = await nextServer.post(
    "/notes",
    note,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  return data;
};

export const register = async (data: { email: string; password: string }) => {
  const res = await nextServer.post("/auth/register", data);

  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await nextServer.post("/auth/login", data);

  return res.data;
};

// logout
export const logout = async () => {
  const res = await nextServer.post("/auth/logout");

  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get("/auth/session");

  return res.data.success;
};

export const getMe = async () => {
  const res = await nextServer.get("/users/me");
  console.log(res.data)

  return res.data;
};


export const updateMe = async (data: { username: string }) => {
  const res = await nextServer.patch("/users/me", data);

  return res.data;
};