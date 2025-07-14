import type { Metadata } from "next";
import "./globals.css";
import PerformanceMonitor from "./components/PerformanceMonitor";

export const metadata: Metadata = {
  title: "Scrubly | Clean up links before you share them",
  description: "Scrubly: Clean up links before you share them. Remove tracking parameters and clean URLs for better privacy.",
  keywords: ["URL cleaner", "link sanitizer", "privacy", "tracking removal"],
  authors: [{ name: "Amour Omar" }],
  creator: "Amour Omar",
  publisher: "Scrubly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://scrubly.app'),
  openGraph: {
    title: "Scrubly | Clean up links before you share them",
    description: "Clean up links before you share them. Remove tracking parameters and clean URLs for better privacy.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrubly | Clean up links before you share them",
    description: "Clean up links before you share them. Remove tracking parameters and clean URLs for better privacy.",
  },
  icons: {
    icon: "/bg-image.jpg",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-black text-white">
        <PerformanceMonitor />
        {children}
      </body>
    </html>
  );
}
