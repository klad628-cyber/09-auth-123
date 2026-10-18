import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default function SidebarNotes() {
  return (
    <nav aria-label="Filter notes by tag">
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map((tag) => (
          <li className={css.menuItem} key={tag}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
