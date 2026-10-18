export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: TagProps;
}

export interface PostNote {
  title: string;
  content: string;
  tag: TagProps;
}

export type TagProps = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export type NoteDraft = PostNote;

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: TagProps;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
