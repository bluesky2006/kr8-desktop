import { extractTrackPaths } from "./utils/extractTrackPaths";
import { getParsedTrackMetadata } from "./utils/getParsedTrackMetadata";
import { updateUi } from "./updateUi";

const dropZone = document.getElementById("drop_zone");
const dropZoneWrapper = document.getElementById("drop_zone_wrapper");
const startAgainButton = document.getElementById("start_again");
const uiContainer = document.getElementById("ui-container");
const circleGroup = document.querySelector(".circle-group"); // record
const mainTitle = document.getElementById("main_title");
const buttons_wrapper = document.getElementById("buttons_wrapper");

// --- record motion helpers ---
const clearTranslateY = () => {
  if (!circleGroup) return;
  // remove ANY translate-y class (positive or negative)
  [...circleGroup.classList].forEach((c) => {
    if (c.startsWith("translate-y-") || c.startsWith("-translate-y-")) {
      circleGroup.classList.remove(c);
    }
  });
};

const peekRecord = () => {
  if (!circleGroup) return;
  clearTranslateY();
  circleGroup.classList.add("-translate-y-6"); // half-peek
};

const resetRecord = () => {
  if (!circleGroup) return;
  clearTranslateY();
  circleGroup.classList.add("-translate-y-24"); // back above box
};

const slideInRecord = () => {
  if (!circleGroup) return;
  clearTranslateY();
  circleGroup.classList.add("translate-y-10"); // fully inside the box
};

// --- drag UX ---
dropZone.addEventListener("dragenter", (e) => {
  e.preventDefault();
  dropZone.classList.add("bg-red-100"); // visual cue
  peekRecord();
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("bg-red-100");
  resetRecord();
});

dropZone.addEventListener("drop", async (e) => {
  e.preventDefault();
  dropZone.classList.remove("bg-red-100");

  try {
    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles.length) {
      console.warn("No file dropped.");
      resetRecord();
      return;
    }

    // animate the record sliding in
    slideInRecord();

    const data = droppedFiles[0];
    const file = await data.text();

    const trackPathArray = await extractTrackPaths(file);
    const playlistObject = await getParsedTrackMetadata(trackPathArray);

    const playlistName = data.name.replace(/\.[^/.]+$/, "");

    const nestedPlaylistObject = {
      playlist_name: playlistName,
      playlist_tracks: [...playlistObject],
    };

    // wait for the slide-in to complete before swapping UI (duration-500)
    setTimeout(() => {
      updateUi(nestedPlaylistObject);

      dropZoneWrapper.classList.add("hidden");
      buttons_wrapper.classList.remove("hidden");

      if (circleGroup) {
        resetRecord(); // set starting transform while hidden
        circleGroup.classList.remove("hidden");
      }
      mainTitle.classList.remove("mb-36");
      mainTitle.classList.add("mb-10");
    }, 550);
  } catch (err) {
    console.error("Drop error:", err);
    resetRecord();
  }
});

startAgainButton.addEventListener("click", () => {
  uiContainer.innerHTML = "";

  buttons_wrapper.classList.add("hidden");
  dropZoneWrapper.classList.remove("hidden");

  if (circleGroup) {
    // Reset position BEFORE unhiding
    resetRecord();
    circleGroup.classList.remove("hidden");
  }

  mainTitle.classList.remove("mb-10");
  mainTitle.classList.add("mb-36");
});
