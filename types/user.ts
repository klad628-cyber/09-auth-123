export interface User {
  id: string;
  username?: string;
  email: string;
  avatar?: string | null;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface LoginPayload extends RegisterPayload {}

export type UserUpdate = Partial<Pick<User, "username">>;
