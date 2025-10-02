export async function getParsedTrackMetadata(trackPathArray: string[]) {
  try {
    const trackMetadataList = await Promise.all(
      trackPathArray.map((filePath, index) => metadataParser(filePath, index))
    );
    return trackMetadataList;
  } catch (error: any) {
    console.error("Error parsing track metadata:", error.message);
    throw error;
  }
}

export async function metadataParser(filePath: string, index: number) {
  try {
    const metadata = await window.electronAPI.parseMetadata(filePath);

    return {
      playlist_position: index + 1,
      track_artist: metadata.common.artist || "Unknown Artist",
      track_title: metadata.common.title || "Unknown Title",
      track_bpm: metadata.common.bpm || "",
      track_length: metadata.format.duration,
      track_image: metadata.common.picture?.[0]?.data ?? null,
      favourite: false,
    };
  } catch (error: any) {
    console.error(`Error parsing metadata for ${filePath}:`, error.message);
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
