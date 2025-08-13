import { metadataParser } from "./metadataParser";

export async function getParsedTrackMetadata(trackPathArray) {
  try {
    const trackMetadataList = await Promise.all(
      trackPathArray.map((filePath, index) => metadataParser(filePath, index))
    );
    return trackMetadataList;
  } catch (error) {
    console.error("Error parsing track metadata:", error.message);
    throw error;
  }
}
