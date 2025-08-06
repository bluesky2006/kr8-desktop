import { readPlaylistFile } from "./readPlaylistFile";

export async function extractTrackPaths() {
  try {
    const rawData = await readPlaylistFile();
    return rawData
      .trim()
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith("#"));
  } catch (error) {
    console.error("Error extracting track paths:", error.message);
    throw error;
  }
}
