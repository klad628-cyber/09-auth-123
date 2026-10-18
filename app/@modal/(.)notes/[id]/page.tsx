import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById, noteQueryKeys } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

export const dynamic = "force-dynamic";

export default async function NotePreview({
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
      <NotePreviewClient />
    </HydrationBoundary>
  );
}
