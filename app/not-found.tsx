import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Notehub",
  description:
    "The page you are looking for could not be found. Return to Notehub to continue browsing your notes.",
  openGraph: {
    title: "404 - Page Not Found | Notehub",
    description:
      "The page you are looking for could not be found. Visit Notehub to continue browsing your notes.",
    url: "http://localhost:3000/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub",
      },
    ],
  },
};

function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
