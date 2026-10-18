import axios from "axios";
import type {
  FetchNotesParams,
  FetchNotesResponse,
  Note,
  NoteDraft,
} from "@/types/note";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api",
  withCredentials: true,
});

export const noteQueryKeys = {
  all: ["notes"] as const,
  lists: () => [...noteQueryKeys.all, "list"] as const,
  list: (params: FetchNotesParams) =>
    [...noteQueryKeys.lists(), params] as const,
  details: () => [...noteQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...noteQueryKeys.details(), id] as const,
};

export async function fetchNotes({
  search = "",
  page = 1,
  perPage = 12,
  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage, tag },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>("/notes/" + id);
  return data;
}

export async function createNote(note: NoteDraft): Promise<Note> {
  const { data } = await api.post<Note>("/notes", note);
  return data;
}

export const postNote = createNote;

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>("/notes/" + id);
  return data;
}
