export const baseURL = "http://localhost:3000/api";

export async function postPlaylistsByUserId(userId: number, payload: any) {
  const res = await fetch(`http://localhost:8787/users/${userId}/playlists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  return res.json();
}
