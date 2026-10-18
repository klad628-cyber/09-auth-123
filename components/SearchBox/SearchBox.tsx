import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  return (
    <input
      onChange={onChange}
      type="text"
      name="notes"
      placeholder="Search notes"
      className={css.input}
    />
  );
}
