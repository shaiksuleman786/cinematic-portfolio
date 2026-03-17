import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Developer Portfolio — Creative Developer",
  description:
    "I create websites and apps that people genuinely love to use. Creative developer specializing in Next.js, Framer Motion, and immersive web experiences.",
  keywords: ["creative developer", "portfolio", "next.js", "framer motion", "web development"],
  openGraph: {
    title: "Developer Portfolio — Creative Developer",
    description: "I create websites and apps that people genuinely love to use.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
