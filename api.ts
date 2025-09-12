export const baseURL = "http://localhost:3000/api";

interface Data {
  playlist_name: string;
  playlist_notes: string;
  favourite: boolean | null;
  playlist_tracks: PlaylistTracks[];
}

interface PlaylistTracks {
  playlist_position: number;
  track_artist: string;
  track_title: string;
  track_bpm: number | null;
  track_length: number;
  favourite: boolean;
  track_image: ArrayBuffer | null;
}

export async function postPlaylistsByUserId(userId: number, data: Data) {
  try {
    const formData = new FormData();

    // Add playlist metadata
    formData.append("playlist_name", data.playlist_name);
    formData.append("playlist_notes", data.playlist_notes);
    formData.append("favourite", String(data.favourite));
    
    // Add track count for backend processing
    formData.append("track_count", data.playlist_tracks.length.toString());

    // Add each track's metadata separately (avoids large JSON field)
    data.playlist_tracks.forEach((track, index) => {
      formData.append(`track_${index}_playlist_position`, track.playlist_position.toString());
      formData.append(`track_${index}_track_artist`, track.track_artist || "");
      formData.append(`track_${index}_track_title`, track.track_title || "");
      // Handle BPM properly - only append if it has a value
      if (track.track_bpm && track.track_bpm.toString().trim() !== "") {
        formData.append(`track_${index}_track_bpm`, track.track_bpm.toString());
      }
      formData.append(`track_${index}_track_length`, track.track_length.toString());
      formData.append(`track_${index}_favourite`, track.favourite.toString());

      // Add track image if exists
      if (track.track_image) {
        const blob = new Blob([track.track_image], { type: "image/jpeg" });
        formData.append(`track_image_${index}`, blob, `track_${index}.jpg`);
      }
    });

    const res = await fetch(`${baseURL}/users/${userId}/playlists`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const msg = await res.text().catch(() => "");
      throw new Error(`Failed to post playlist (${res.status}) ${msg}`);
    }
    const test = await res.json();
    console.log(test, "response body");
    return res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
}
