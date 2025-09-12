export async function extractTrackPaths(file: string) {
  try {
    return file
      .trim()
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith("#"));
  } catch (error: any) {
    console.error("Error extracting track paths:", error.message);
    throw error;
  }
}
