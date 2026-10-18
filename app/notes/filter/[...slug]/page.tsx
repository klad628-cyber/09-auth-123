import { notFound } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import NotesClient from "./Notes.client";
import { fetchNotes, noteQueryKeys } from "@/lib/api";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug[0] ?? "all";
  const filterName =
    filter === "all"
      ? "All notes"
      : `${filter.charAt(0).toUpperCase()}${filter.slice(1)}`;
  const title = `${filterName} | NoteHub`;
  const description =
    filter === "all"
      ? "Browse all of your notes in NoteHub."
      : `Browse your ${filterName} notes in NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${slug.map(encodeURIComponent).join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub - Your thoughts, in order",
        },
      ],
    },
  };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (slug.length !== 1) notFound();

  const filter = slug[0];
  const tag =
    filter === "all"
      ? undefined
      : tags.find((availableTag) => availableTag === filter);

  if (filter !== "all" && !tag) notFound();

  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000 } },
  });
  const paramsForNotes = {
    search: "",
    page: 1,
    perPage: 12,
    tag,
  };
  const queryKey = noteQueryKeys.list(paramsForNotes);

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchNotes(paramsForNotes),
  });
  const queryError = queryClient.getQueryState(queryKey)?.error;
  if (queryError) throw queryError;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
