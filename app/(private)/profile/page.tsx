"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { fetchMe } from "@/lib/api/clientApi";
import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (!user) {
      void fetchMe().then(setUser).catch(() => setUser(null));
    }
  }, [user, setUser]);

  if (!user) {
    return <main className={css.mainContent}>Loading profile...</main>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile</h1>
          <Link className={css.editProfileButton} href="/profile/edit">
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar ?? "https://ac.goit.global/empty_avatar.jpg"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <span>Username:</span>
            <span>{user.username ?? user.email}</span>
          </div>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
