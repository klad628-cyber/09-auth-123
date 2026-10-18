import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById, noteQueryKeys } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  const title = `${note.title} | NoteHub`;
  const description =
    note.content.slice(0, 160) || `Read the details of "${note.title}".`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/${encodeURIComponent(id)}`,
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

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000 } },
  });
  const queryKey = noteQueryKeys.detail(id);

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchNoteById(id),
  });
  const queryError = queryClient.getQueryState(queryKey)?.error;
  if (queryError) throw queryError;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
