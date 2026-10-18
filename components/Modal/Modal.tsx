import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
// import type { PostNote } from '../../types/note';

interface ModalProps {
  onClose: () => void;
  // onSubmit: (note: PostNote) => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    setMounted(true);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "visible";
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.dialog}>{children}</div>
    </div>,
    document.body,
  );
}
