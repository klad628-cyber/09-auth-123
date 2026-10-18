"use client";

export default function NotesError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="route-message" role="alert">
      <p>Could not fetch the list of notes. {error.message}</p>
      <button className="text-button" type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
