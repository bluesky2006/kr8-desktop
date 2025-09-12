import React, { useMemo } from "react";

export function Artwork({ data }: { data: ArrayBuffer | null }) {
  const url = useMemo(() => {
    if (!data) return null;
    const blob = new Blob([data], { type: "image/jpeg" });
    return URL.createObjectURL(blob);
  }, [data]);
  if (!url) return null;
  return <img src={url} alt="Track artwork" className="w-28 h-38 object-cover rounded" />;
}
