import axios from "axios";
import type { User, UserUpdate } from "@/types/user";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api",
  withCredentials: true,
});

export async function fetchSession(): Promise<User | null> {
  try {
    const { data } = await apiClient.get<User | null>("/auth/session");
    return data ?? null;
  } catch {
    return null;
  }
}

export async function login(payload: { email: string; password: string }) {
  const { data } = await apiClient.post<User>("/auth/login", payload);
  return data;
}

export async function register(payload: { email: string; password: string }) {
  const { data } = await apiClient.post<User>("/auth/register", payload);
  return data;
}

export async function logout() {
  await apiClient.post("/auth/logout");
}

export async function fetchMe(): Promise<User> {
  const { data } = await apiClient.get<User>("/users/me");
  return data;
}

export async function updateMe(payload: UserUpdate): Promise<User> {
  const { data } = await apiClient.patch<User>("/users/me", payload);
  return data;
}
