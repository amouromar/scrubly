"use client";

import { useState, useCallback, useMemo } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Logo from "@/app/components/Logo";
import { sanitizeUrl } from "@/app/utils/urlSanitizer";

export default function Component() {
  const [url, setUrl] = useState("");
  const [sanitizedUrl, setSanitizedUrl] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSanitize = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    setIsAnimating(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const result = sanitizeUrl(url);
      setSanitizedUrl(result);
      setIsAnimating(false);
    }, 1500); // Reduced from 3000ms to 1500ms for better UX
  }, [url]);

  const isUrlValid = useMemo(() => {
    return url.trim().length > 0;
  }, [url]);

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    // Clear sanitized URL when input changes
    if (sanitizedUrl) {
      setSanitizedUrl("");
    }
  }, [sanitizedUrl]);

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
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
              onChange={handleUrlChange}
              className="w-full p-2 bg-slate-700 rounded-md outline-none placeholder:text-gray-400 text-white font-medium text-sm"
              disabled={isAnimating}
            />
            <button
              type="submit"
              className={`w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                isUrlValid && !isAnimating
                  ? "bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400 font-semibold"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed font-semibold"
              }`}
              disabled={!isUrlValid || isAnimating}
            >
              {isAnimating ? (
                <Loader2 className="animate-spin mx-auto h-5 w-5" />
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
