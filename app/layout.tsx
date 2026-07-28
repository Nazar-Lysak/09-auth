import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "Notehub",
  description: "Notehub Home Page",
  openGraph: {
    title: "Notehub",
    description: "Notehub Home Page",
    url: "https://08-zuatand.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanStackProvider>
        <body className={`min-h-dvh flex flex-col ${roboto.variable}`}>
          <Header />
          <div className="grow">
            {children}
            {modal}
          </div>
          <Footer />
        </body>
      </TanStackProvider>
    </html>
  );
}
