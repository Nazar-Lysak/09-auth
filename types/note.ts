export type NoteTag =
  | "Todo"
  | "Work"
  | "Shopping"
  | "Personal"
  | "Meeting";

export interface NoteBase {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface Note extends NoteBase {
  id: string;
  createdAt: string;
  updatedAt: string;
}