import { extractTrackPaths } from "./utils/extractTrackPaths";
import { getParsedTrackMetadata } from "./utils/getParsedTrackMetadata";
import { updateUi } from "./updateUi";

export const form = document.getElementById("form");
form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const input = document.getElementById("file-input");
    const data = input.files[0];
    console.log(data, "data");
    const file = await data.text();

    // call the manipulation functions
    const trackPathArray = await extractTrackPaths(file);
    const playlistObject = await getParsedTrackMetadata(trackPathArray);

    const playlistName = data.name.replace(/\.[^/.]+$/, "");

    const nestedPlaylistObject = {
      playlist_name: playlistName,
      playlist_tracks: [...playlistObject],
    };
    console.log(nestedPlaylistObject, "nested jobber");

    updateUi(nestedPlaylistObject);
  } catch (err) {
    console.log(err);
  }

  console.log("form was submitted");
});

//render here

//post to db
