export function createPill(text) {
  const pill = document.createElement("span");
  pill.textContent = text;
  pill.className =
    "bg-red-400 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap";
  return pill;
}

export function createEditableTitle(nestedPlaylistObject) {
  const titleInput = document.createElement("input");
  titleInput.value = nestedPlaylistObject.playlist_name;
  titleInput.className =
    "text-2xl font-bold mb-4 w-full bg-transparent focus:outline-none border-b-2 border-transparent focus:border-red-400";

  titleInput.addEventListener("blur", () => {
    nestedPlaylistObject.playlist_name = titleInput.value.trim();
    console.log("Playlist name updated:", nestedPlaylistObject.playlist_name);
  });

  titleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      titleInput.blur();
    }
  });

  return titleInput;
}

export function convertLengthToTime(length) {
  const minutes = Math.floor(length / 60);
  const seconds = Math.floor(length % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
