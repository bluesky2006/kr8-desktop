import { extractTrackPaths } from "./utils/extractTrackPaths";
import { getParsedTrackMetadata } from "./utils/getParsedTrackMetadata";
import { updateUi } from "./updateUi";
import { postPlaylistsByUserId } from "../api";

const dropZone = document.getElementById("drop_zone");
const dropZoneWrapper = document.getElementById("drop_zone_wrapper");
const startAgainButton = document.getElementById("start_again");
const uiContainer = document.getElementById("ui-container");
const circleGroup = document.querySelector(".circle-group"); // record
const mainTitle = document.getElementById("main_title");
const buttons_wrapper = document.getElementById("buttons_wrapper");
const uploadButton = document.getElementById("upload_button");
const userID = 1;

let nestedPlaylistObject = {};

if (circleGroup) {
  circleGroup.style.setProperty("--record-y", "-7.1rem");
  requestAnimationFrame(() => {
    circleGroup.classList.add("transition-transform", "duration-500", "ease-out");
  });
}

const setRecordY = (val) => {
  if (circleGroup) {
    circleGroup.style.setProperty("--record-y", val);
  }
};

const peekRecord = () => setRecordY("-1.5rem");
const resetRecord = () => setRecordY("-7.1rem");
const slideInRecord = () => setRecordY("1.5rem");

dropZone.addEventListener("dragenter", (e) => {
  e.preventDefault();
  dropZone.classList.add("bg-red-100");
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
      resetRecord();
      return;
    }

    slideInRecord();

    const data = droppedFiles[0];
    const file = await data.text();

    const trackPathArray = await extractTrackPaths(file);
    const playlistObject = await getParsedTrackMetadata(trackPathArray);

    const playlistName = data.name.replace(/\.[^/.]+$/, "");
    nestedPlaylistObject = {
      user_id: userID,
      playlist_name: playlistName,
      playlist_notes: "fake notes",
      favourite: false,
      playlist_tracks: [...playlistObject],
    };

    // wait for slide-in to complete (matches duration-500)
    setTimeout(() => {
      updateUi(nestedPlaylistObject);

      dropZoneWrapper.classList.add("hidden");
      buttons_wrapper.classList.remove("hidden");
      circleGroup?.classList.add("hidden");

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
    resetRecord(); // set Y while still hidden
    circleGroup.classList.remove("hidden"); // then show
  }

  mainTitle.classList.remove("mb-10");
  mainTitle.classList.add("mb-36");
});

uploadButton.addEventListener(
  "click",
  async () => {
    try {
      const res = await postPlaylistsByUserId(userID, nestedPlaylistObject);
      console.log("Upload OK:", res);
    } catch (e) {
      console.error(e);
      alert(e.message); // temporary surface of the error text/status
    }
  },
  { once: true }
);
