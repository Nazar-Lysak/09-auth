"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Oops, something went wrong...</p>;
  }

  if (!note) {
    return <p>Note not found.</p>;
  }

  return (
    <Modal onClose={() => router.back()}>
      <div>
        <button onClick={() => router.back()}>back</button>
        <h1>{note.title}</h1>
        <p>{note.id}</p>
        {note.tag && <p>{note.tag}</p>}
        {note.createdAt && <p>{note.createdAt}</p>}
        <p>{note.content}</p>
      </div>
    </Modal>
  );
}
