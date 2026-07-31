import { redirect } from "next/navigation";

function NotesFilter() {
  redirect("/notes/filter/all");

  return null;
}

export default NotesFilter;
