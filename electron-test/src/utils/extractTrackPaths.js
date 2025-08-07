export async function extractTrackPaths(file) {
  try {
    console.log(file, "ETP");
    return file
      .trim()
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith("#"));
  } catch (error) {
    console.error("Error extracting track paths:", error.message);
    throw error;
  }
}
