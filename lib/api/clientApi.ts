import axios from "axios";
import type { Note } from "../../types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get(`/notes/${id}`);

  return data;
};

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
  });
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  console.log(id);
  const { data } = await nextServer.delete(`/notes/${id}`);

  return data;
};

export const createNote = async (
  note: Note,
): Promise<Note> => {
  const { data } = await nextServer.post("/notes", note);

  return data;
};

export const register = async (data: { email: string; password: string }): Promise<User> => {
  const res = await nextServer.post("/auth/register", data);

  return res.data;
};

export const login = async (data: { email: string; password: string }): Promise<User> => {
  const res = await nextServer.post("/auth/login", data);

  return res.data;
};

export const logout = async () => {
  const res = await nextServer.post("/auth/logout");

  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get("/auth/session");

  return res.data;
};

export const getMe = async (): Promise<User> => {
  const res = await nextServer.get("/users/me");

  return res.data;
};

export const updateMe = async (data: { username: string }): Promise<User> => {
  const res = await nextServer.patch("/users/me", data);

  return res.data;
};
