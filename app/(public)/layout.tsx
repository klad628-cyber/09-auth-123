import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";

export default async function PublicLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/profile");
  }

  return <>{children}</>;
}
