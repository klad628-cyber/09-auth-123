"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      router.push("/signin");
    } catch {
      clearUser();
      router.push("/signin");
    }
  };

  if (user) {
    return (
      <div className={css.navigationItem}>
        <Link className={css.navigationLink} href="/profile">
          <span className={css.userEmail}>{user.email}</span>
        </Link>
        <button
          type="button"
          className={css.logoutButton}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className={css.navigationItem}>
      <Link className={css.navigationLink} href="/signin">
        Sign in
      </Link>
      <Link className={css.navigationLink} href="/signup">
        Sign up
      </Link>
    </div>
  );
}
