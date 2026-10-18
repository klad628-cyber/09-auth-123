"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, noteQueryKeys } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";
import type { NoteDraft } from "@/types/note";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = useId();
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createNote,
  });

  const handleSubmit = async (formData: FormData) => {
    const tagValue = formData.get("tag");
    const tag = tags.find((availableTag) => availableTag === tagValue);

    if (!tag) {
      setSubmissionError("Please select a valid note tag.");
      return;
    }

    const note: NoteDraft = {
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      tag,
    };

    setSubmissionError(null);

    try {
      await mutation.mutateAsync(note);
      clearDraft();
      await queryClient.invalidateQueries({ queryKey: noteQueryKeys.all });
      router.push("/notes/filter/all");
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : "Could not create the note.",
      );
    }
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          id={`${id}-title`}
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft.title}
          minLength={3}
          maxLength={50}
          required
          onChange={(event) => setDraft({ title: event.currentTarget.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-content`}>Content</label>
        <textarea
          id={`${id}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          maxLength={500}
          onChange={(event) => setDraft({ content: event.currentTarget.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-tag`}>Tag</label>
        <select
          id={`${id}-tag`}
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          required
          onChange={(event) =>
            setDraft({
              tag:
                tags.find((tag) => tag === event.currentTarget.value) ?? "Todo",
            })
          }
        >
          {tags.map((tag) => (
            <option value={tag} key={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {submissionError && (
        <p className={css.error} role="alert">
          {submissionError}
        </p>
      )}

      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
