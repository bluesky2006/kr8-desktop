export const baseURL = 'http://localhost:3000/api';

export async function postPlaylistsByUserId(userId, data) {
  try {
    const formData = new FormData();

    // Add playlist metadata
    formData.append('playlist_name', data.playlist_name);
    formData.append('playlist_notes', data.playlist_notes);
    formData.append('favourite', data.favourite);

    // Add each track
    data.playlist_tracks.forEach((track, index) => {
      // Add metadata fields with indexed keys
      formData.append(
        `playlist_tracks[${index}][playlist_position]`,
        track.playlist_position
      );
      formData.append(
        `playlist_tracks[${index}][track_artist]`,
        track.track_artist
      );
      formData.append(
        `playlist_tracks[${index}][track_title]`,
        track.track_title
      );
      formData.append(`playlist_tracks[${index}][track_bpm]`, track.track_bpm);
      formData.append(
        `playlist_tracks[${index}][track_length]`,
        track.track_length
      );
      formData.append(`playlist_tracks[${index}][favourite]`, track.favourite);

      // Add binary track image as Blob
      if (track.track_image) {
        const blob = new Blob([track.track_image], { type: 'image/jpeg' }); // adjust MIME type
        formData.append(`track_images`, blob, `track_${index + 1}.jpg`);
      }
    });

    const res = await fetch(`${baseURL}/users/${userId}/playlists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const msg = await res.text().catch(() => '');
      throw new Error(`Failed to post playlist (${res.status}) ${msg}`);
    }
    return res.json();
  } catch (err) {
    console.log(err);
  }
}
