import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub | Your thoughts, in order",
  description: "A simple, efficient home for your personal notes.",
  openGraph: {
    title: "NoteHub | Your thoughts, in order",
    description: "A simple, efficient home for your personal notes.",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Your thoughts, in order",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <div className="site-shell">
            <Header />
            {children}
            {modal}
            <Footer />
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}
