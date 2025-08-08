import { extractTrackPaths } from "./utils/extractTrackPaths";
import { getParsedTrackMetadata } from "./utils/getParsedTrackMetadata";
import { updateUi } from "./updateUi";

const dropZone = document.getElementById("drop_zone");
const dropZoneWrapper = document.getElementById("drop_zone_wrapper");
const startAgainButton = document.getElementById("start_again");
const uiContainer = document.getElementById("ui-container");
const circleGroup = document.querySelector(".circle-group");
const mainTitle = document.getElementById("main_title");
const buttons_wrapper = document.getElementById("buttons_wrapper");

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("bg-red-100");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("bg-red-100");
});

dropZone.addEventListener("drop", async (e) => {
  e.preventDefault();
  dropZone.classList.remove("bg-red-100");

  try {
    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles.length) {
      console.warn("No file dropped.");
      return;
    }

    const data = droppedFiles[0];
    const file = await data.text();

    const trackPathArray = await extractTrackPaths(file);
    const playlistObject = await getParsedTrackMetadata(trackPathArray);

    const playlistName = data.name.replace(/\.[^/.]+$/, "");

    const nestedPlaylistObject = {
      playlist_name: playlistName,
      playlist_tracks: [...playlistObject],
    };

    updateUi(nestedPlaylistObject);

    dropZoneWrapper.classList.add("hidden");
    buttons_wrapper.classList.remove("hidden");
    circleGroup.classList.add("hidden");
    mainTitle.classList.remove("mb-36");
    mainTitle.classList.add("mb-10");
  } catch (err) {
    console.error("Drop error:", err);
  }
});

startAgainButton.addEventListener("click", () => {
  uiContainer.innerHTML = "";

  dropZoneWrapper.classList.remove("hidden");
  buttons_wrapper.classList.add("hidden");
  circleGroup.classList.remove("hidden");
  mainTitle.classList.remove("mb-10");
  mainTitle.classList.add("mb-36");
});
