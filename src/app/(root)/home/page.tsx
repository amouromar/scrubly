"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Logo from "@/app/components/Logo";

export default function Component() {
  const [url, setUrl] = useState("");
  const [sanitizedUrl, setSanitizedUrl] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSanitize = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      const result = sanitizeUrl(url);
      setSanitizedUrl(result);
      setIsAnimating(false);
    }, 3000);
  };

  const sanitizeUrl = (url: string): string => {
    try {
      const parsedUrl = new URL(url);

      if (
        parsedUrl.hostname === "www.youtube.com" ||
        parsedUrl.hostname === "youtube.com" ||
        parsedUrl.hostname === "music.youtube.com"
      ) {
        const videoId = parsedUrl.searchParams.get("v");
        if (videoId) {
          parsedUrl.search = `?v=${videoId}`;
        } else {
          parsedUrl.search = "";
        }
      } else {
        parsedUrl.search = "";
      }

      parsedUrl.hash = "";
      return parsedUrl.toString();
    } catch (error) {
      return "Invalid URL";
    }
  };

  useEffect(() => {
    setIsAnimating(false);
    setSanitizedUrl("");
  }, [url]);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="bg-black shadow-sm">
        <div className="max-w-7xl mx-auto text-center py-4 px-4 sm:px-6 lg:px-8">
          <Logo />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-lg">
          <div className="mb-6 flex justify-center">
            <Image
              src="/bg-image.jpg"
              alt="URL Sanitizer"
              width={512}
              height={523}
              className="rounded-lg"
            />
          </div>
          <h2 className="text-xl font-semibold mb-6 text-center text-white">
            clean up links before you share them
          </h2>
          <form onSubmit={handleSanitize} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 bg-slate-700 rounded-md outline-none placeholder-shown: text-white font-medium text-sm"
            />
            <button
              type="submit"
              className={`w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                url
                  ? "bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400 font-semibold"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed hover:cursor-not-allowed font-semibold"
              }`}
              disabled={!url || isAnimating}
            >
              {isAnimating ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Scrub"
              )}
            </button>
          </form>
          {sanitizedUrl && (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 mt-6 p-2 rounded-md">
              <h3 className="text-md font-semibold text-white whitespace-nowrap">clean link:</h3>
              <a
                href={sanitizedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline font-semibold text-[0.85rem] hover:underline break-all"
              >
                {sanitizedUrl}
              </a>
            </div>
          )}
        </div>
      </main>

      <footer className="shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Scrubly, by Amour Omar.
          </p>
        </div>
      </footer>
    </div>
  );
}
