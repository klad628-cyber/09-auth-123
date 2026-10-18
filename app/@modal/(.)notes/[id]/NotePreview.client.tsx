"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById, noteQueryKeys } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "../../../notes/[id]/NoteDetailsClient.module.css";
import previewCss from "./NotePreview.module.css";

export default function NotePreviewClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: noteQueryKeys.detail(id),
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      {isLoading ? (
        <p>Loading note...</p>
      ) : isError || !note ? (
        <p role="alert">Could not load this note.</p>
      ) : (
        <article className={css.item}>
          <div className={`${css.header} ${previewCss.header}`}>
            <h1>{note.title}</h1>
            <button
              aria-label="Close note preview"
              className={previewCss.closeButton}
              onClick={() => router.back()}
              type="button"
            >
              ×
            </button>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </article>
      )}
    </Modal>
  );
}
