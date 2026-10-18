import axios from "axios";
import { cookies } from "next/headers";
import type { User } from "@/types/user";

const serverApi = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const { data } = await serverApi.get<User>("/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return data ?? null;
  } catch {
    return null;
  }
}
