import type { Metadata } from "next";
import { Fredoka, Quicksand } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "LOL Map — The Reverse GeoGuesser",
  description:
    "We give you the location name. You find it on the map. How well do you know your geography?",
  icons: {
    icon: '/main.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${quicksand.variable}`}>
      <body
        className={quicksand.className}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </body>
    </html>
  );
}
