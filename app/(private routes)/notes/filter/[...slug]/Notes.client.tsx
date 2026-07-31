"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./page.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import { fetchNotes } from "@/lib/api/clientApi";

interface NoteClientProps {
  category?: string;
}

function NotesClient({ category }: NoteClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);

  const {
    data: notes,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["notes", searchQuery, page, category],
    queryFn: () => fetchNotes(searchQuery, page, category),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((query: string) => {
    if (page !== 1) {
      setPage(1);
    }
    setSearchQuery(query);
  }, 700);

  if (!notes) {
    return null;
  }

  return (
    <div>
      <header className={css.toolbar}>
        <SearchBox handleSearch={handleSearch} />
        {isSuccess && notes.totalPages > 1 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={notes.totalPages}
          />
        )}

        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <h2>Something went wrong</h2>}
      {isSuccess && notes.notes.length > 0 && <NoteList notes={notes.notes} />}
    </div>
  );
}

export default NotesClient;
