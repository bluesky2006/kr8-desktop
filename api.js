export const baseURL = "http://100.106.142.112:3000/api";

export async function postPlaylistsByUserId(userId, data) {
  const res = await fetch(`${baseURL}/users/${userId}/playlists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`Failed to post playlist (${res.status}) ${msg}`);
  }
  return res.json();
}
