export const sanitizeUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);

    // Handle YouTube URLs specifically
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
      // Remove all query parameters for other URLs
      parsedUrl.search = "";
    }

    // Remove hash fragments
    parsedUrl.hash = "";
    
    return parsedUrl.toString();
  } catch {
    return "Invalid URL";
  }
};