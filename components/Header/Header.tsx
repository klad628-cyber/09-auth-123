import Link from "next/link";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <Link className={css.brand} href="/" aria-label="NoteHub home">
        NoteHub<span>.</span>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
        </ul>
      </nav>
      <AuthNavigation />
    </header>
  );
}
