// import css from "./LayoutNotes.module.css";

interface LayoutNotesProps {
  children: React.ReactNode;
}

function LayoutNotes({ children }: LayoutNotesProps) {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
}

export default LayoutNotes;
