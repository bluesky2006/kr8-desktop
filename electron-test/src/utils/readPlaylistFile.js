import * as fs from "fs/promises";

export async function readPlaylistFile() {
  try {
    return await fs.readFile("./test-playlist.m3u", "utf8");
  } catch (error) {
    console.error("Error reading playlist file:", error.message);
    throw error;
  }
}
