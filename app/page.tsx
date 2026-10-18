import Link from "next/link";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <p className={css.eyebrow}>A quieter place for your thoughts</p>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing
          personal notes. It helps keep your thoughts organized and accessible
          in one place, whether you are at home or on the go.
        </p>
        <p className={css.description}>
          The app provides a clean interface for writing, editing, and browsing
          notes. With support for keyword search and structured organization,
          NoteHub offers a streamlined experience for anyone who values clarity
          and productivity.
        </p>
        <Link className={css.action} href="/notes/filter/all">
          Open your notes <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className={css.index} aria-hidden="true">
        NH
        <br />/ 01
      </div>
    </main>
  );
}
