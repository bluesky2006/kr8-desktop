import { getParsedTrackMetadata } from "./getParsedTrackMetadata.js";

getParsedTrackMetadata()
  .then((data) => console.log(data))
  .catch((err) => console.error("Unhandled error:", err));
