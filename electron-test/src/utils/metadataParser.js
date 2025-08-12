export async function metadataParser(filePath, index) {
  try {
    const metadata = await window.electronAPI.parseMetadata(filePath);
    console.log(metadata, "metadata object");

    return {
      playlist_position: index + 1,
      track_artist: metadata.common.artist || "Unknown Artist",
      track_title: metadata.common.title || "Unknown Title",
      track_bpm: metadata.common.bpm || "",
      track_length: metadata.format.duration,
      track_image: metadata.common.picture?.[0]?.data ?? null,
    };
  } catch (error) {
    console.error(`Error parsing metadata for ${filePath}:`, error.message);
    return {
      playlist_position: index + 1,
      track_artist: "Unknown Artist",
      track_title: "Unknown Title",
      track_bpm: "",
      track_length: 0,
      track_image: null,
    };
  }
}
