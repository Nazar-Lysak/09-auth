import { Metadata } from "next";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Notehub",
  description: "Notehub | Create Note Page",
  openGraph: {
    title: "Notehub",
    description: "Notehub | Create Note Page",
    url: "https://08-zuatand.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create Note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
