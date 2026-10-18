"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [username, setUsername] = useState(user?.username ?? user?.email ?? "");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    const nextUsername = username.trim();
    if (!nextUsername) return;

    const updatedUser = await updateMe({ username: nextUsername });
    setUser(updatedUser);
    router.push("/profile");
  };

  if (!user) {
    return <main className={css.mainContent}>Loading profile...</main>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar ?? "https://ac.goit.global/empty_avatar.jpg"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
