import css from "./page.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { fetchNotes } from "@/lib/api/serverApi";

interface FilterNotesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: FilterNotesProps): Promise<Metadata> {
  const { slug } = await params;
  const currentCategory =
    slug[0].toLocaleLowerCase() === "all" ? "All" : slug[0];

  return {
    title: `Category: ${currentCategory}`,
    description: `Filtred notes by: ${currentCategory}`,
    openGraph: {
      title: `Category: ${currentCategory}`,
      description: `Filtred notes by: ${currentCategory}`,
      url: `https://08-zuatand.vercel.app/notes/filter/${currentCategory}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Notehub",
        },
      ],
    },
  };
}

async function FilterNotes({ params }: FilterNotesProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;

  const currentCategory =
    slug[0].toLocaleLowerCase() === "all" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, currentCategory],
    queryFn: () => fetchNotes("", 1, currentCategory),
  });

  return (
    <div className={css.notes}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient category={currentCategory} />
      </HydrationBoundary>
    </div>
  );
}

export default FilterNotes;
