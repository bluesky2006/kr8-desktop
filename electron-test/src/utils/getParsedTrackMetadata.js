import { extractTrackPaths } from "./extractTrackPaths";
import { metadataParser } from "./metadata-parser";

export async function getParsedTrackMetadata() {
  try {
    const trackPaths = await extractTrackPaths();
    const trackMetadataList = await Promise.all(
      trackPaths.map((filePath, index) => metadataParser(filePath, index))
    );
    return trackMetadataList;
  } catch (error) {
    console.error("Error parsing track metadata:", error.message);
    throw error;
  }
}
