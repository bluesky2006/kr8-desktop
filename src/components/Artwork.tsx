import React, { useMemo } from "react";
import type { TrackImage } from "../types/types.js"; // adjust path

export function Artwork({ image }: { image: TrackImage | null | undefined }) {
  const src = useMemo(() => {
    if (!image?.base64) return null;

    // If mime is missing, fall back to jpeg
    const mime = image.mime || "image/jpeg";

    // Data URLs are the easiest path in desktop web/electron
    return `data:${mime};base64,${image.base64}`;
  }, [image]);

  if (!src) return null;

  return (
    <img
      src={src}
      alt="Track artwork"
      className="w-full h-full object-cover rounded"
      loading="lazy"
    />
  );
}
