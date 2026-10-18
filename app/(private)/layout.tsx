import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";

export default async function PrivateLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  return <>{children}</>;
}
