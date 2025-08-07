import { renderImageFromUint8 } from "./utils/imageRenderer";

const uiContainer = document.getElementById("ui-container");
console.log(uiContainer, "getting ui div");

export const updateUi = (nestedPlaylistObject) => {
  console.log(nestedPlaylistObject, "obj");

  uiContainer.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.textContent = nestedPlaylistObject.playlist_name;
  h1.className = "text-2xl font-bold mb-4";
  uiContainer.appendChild(h1);

  nestedPlaylistObject.playlist_tracks.forEach((track) => {
    const trackDiv = document.createElement("div");
    trackDiv.className =
      "flex justify-between items-center mb-4 p-3 rounded bg-white shadow";

    // Left side: title + artist
    const textDiv = document.createElement("div");
    textDiv.className = "flex flex-col";

    const p = document.createElement("p");
    p.textContent = track.track_id;
    p.className = "text-base font-normal";

    const h2 = document.createElement("h2");
    h2.textContent = track.track_title || "Untitled Track";
    h2.className = "text-lg font-semibold leading-snug";

    const h3 = document.createElement("h3");
    h3.textContent = track.track_artist || "Unknown Artist";
    h3.className = "text-base font-medium text-gray-600";

    textDiv.appendChild(p);
    textDiv.appendChild(h2);
    textDiv.appendChild(h3);
    trackDiv.appendChild(textDiv);

    // Right side: image
    if (track.track_image) {
      renderImageFromUint8(track.track_image, trackDiv);
    }

    uiContainer.appendChild(trackDiv);
  });

  console.log("ui rendered");
};
