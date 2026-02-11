function bytesToBase64(data: ArrayBuffer | Uint8Array) {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);

  // Build base64 in chunks to avoid "Maximum call stack size exceeded"
  let binary = "";
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}

export async function getParsedTrackMetadata(trackPathArray: string[]) {
  try {
    const trackMetadataList = await Promise.all(
      trackPathArray.map((filePath, index) => metadataParser(filePath, index))
    );
    return trackMetadataList;
  } catch (error: any) {
    console.error("Error parsing track metadata:", error?.message ?? error);
    throw error;
  }
}

export async function metadataParser(filePath: string, index: number) {
  try {
    const metadata = await window.electronAPI.parseMetadata(filePath);

    const pic = metadata.common.picture?.[0];

    const track_image = pic?.data
      ? {
          mime: pic.format || "image/jpeg",
          base64: bytesToBase64(pic.data),
        }
      : null;

    return {
      playlist_position: index + 1,
      track_artist: metadata.common.artist || "Unknown Artist",
      track_title: metadata.common.title || "Unknown Title",
      track_bpm: metadata.common.bpm || "",
      track_length: metadata.format.duration,
      track_image,
      favourite: false,
    };
  } catch (error: any) {
    console.error(`Error parsing metadata for ${filePath}:`, error?.message ?? error);
    return {
      playlist_position: index + 1,
      track_artist: "Unknown Artist",
      track_title: "Unknown Title",
      track_bpm: "",
      track_length: 0,
      track_image: null,
      favourite: false,
    };
  }
}