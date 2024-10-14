import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scrubly | Clean up links before you share them",
  description: "Scrubly: Clean up links before you share them",
  icons: {
    icon: "/bg-image.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
