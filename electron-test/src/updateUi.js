import { renderImageFromUint8 } from "./utils/imageRenderer";
import {
  createEditableTitle,
  createPill,
  convertLengthToTime,
} from "./utils/uiHelpers";
import { getFormattedDateTime } from "./utils/getFormattedDateTime.js";

const uiContainer = document.getElementById("ui-container");

export const updateUi = (nestedPlaylistObject) => {
  console.log(nestedPlaylistObject, "nestedPlaylistObject");

  uiContainer.innerHTML = "";

  // Append editable title input
  const titleInput = createEditableTitle(nestedPlaylistObject);
  uiContainer.appendChild(titleInput);

  const { dbFormat, friendlyFormat } = getFormattedDateTime();

  const dateField = document.createElement("p");
  dateField.textContent = `Created on ${friendlyFormat}`;
  dateField.className = "italic text-sm mb-4";

  uiContainer.appendChild(dateField);

  // Render each track
  nestedPlaylistObject.playlist_tracks.forEach((track) => {
    const trackDiv = document.createElement("div");
    trackDiv.className =
      "flex flex-col justify-between mb-4 p-3 rounded bg-white shadow";

    // Row: text + image
    const topRow = document.createElement("div");
    topRow.className = "flex flex-row justify-between items-start gap-4";

    // Text container
    const textDiv = document.createElement("div");
    textDiv.className = "flex flex-col flex-1 min-w-0";

    const h2 = document.createElement("h2");
    h2.textContent = track.track_title || "Untitled Track";
    h2.className = "text-lg font-semibold leading-snug break-words";

    const h3 = document.createElement("h3");
    h3.textContent = track.track_artist || "Unknown Artist";
    h3.className = "text-base font-medium text-gray-600 truncate";

    textDiv.appendChild(h2);
    textDiv.appendChild(h3);
    topRow.appendChild(textDiv);

    // Image container
    if (track.track_image) {
      const imageContainer = document.createElement("div");
      imageContainer.className = "w-24 h-24 shrink-0";
      renderImageFromUint8(track.track_image, imageContainer);
      topRow.appendChild(imageContainer);
    }

    trackDiv.appendChild(topRow);

    // Bottom info: pills
    const infoDiv = document.createElement("div");
    infoDiv.className = "flex flex-wrap items-center gap-2 text-sm mt-2";

    infoDiv.appendChild(createPill(`#${track.track_id}`));
    infoDiv.appendChild(
      createPill(track.track_bpm ? `${track.track_bpm} BPM` : "BPM N/A")
    );
    infoDiv.appendChild(
      createPill(convertLengthToTime(track.track_length) || "Length N/A")
    );

    trackDiv.appendChild(infoDiv);
    uiContainer.appendChild(trackDiv);
  });
};
