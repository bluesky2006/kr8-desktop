import React, { useCallback, useState } from "react";
import { extractTrackPaths } from "../utils/extractTrackPaths";
import { getParsedTrackMetadata } from "../utils/getParsedTrackMetadata";
import { postPlaylistsByUserId } from "../../api";
import { Logo } from "../components/Logo";
import { Dropzone } from "../components/Dropzone";
import { ActionsBar } from "../components/ActionsBar";
import { EditableTitle } from "../components/EditableTitle";
import { TrackList } from "../components/TrackList";

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  const [playlistName, setPlaylistName] = useState("Playlist");
  const [tracks, setTracks] = useState<Array<any>>([]);

  const handleFile = useCallback(async (file: any) => {
    setPlaylistName(file.name.replace(/\.[^/.]+$/, ""));
    const text = await file.text();
    const paths = await extractTrackPaths(text);
    const parsed = await getParsedTrackMetadata(paths);

    await pause(750);
    setTracks(parsed);
  }, []);

  const handleStartAgain = useCallback(() => {
    setTracks([]);
    setPlaylistName("Playlist");
  }, []);

  const handleUpload = useCallback(async () => {
    try {
      const payload = {
        user_id: 1,
        playlist_name: playlistName,
        playlist_notes: "fake notes",
        favourite: false,
        playlist_tracks: tracks,
      };
      await postPlaylistsByUserId(1, payload);
      console.log("Upload OK");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Upload failed");
    }
  }, [playlistName, tracks]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="p-6 w-[90vmin] aspect-square max-w-4xl flex flex-col justify-center items-center bg-white rounded">
        <Logo compact={tracks.length > 0} />
        {tracks.length === 0 ? (
          <Dropzone onFile={handleFile} />
        ) : (
          <>
            <ActionsBar onStartAgain={handleStartAgain} onUpload={handleUpload} />
            <EditableTitle value={playlistName} onChange={setPlaylistName} />
            <TrackList tracks={tracks} />
          </>
        )}
      </div>
    </div>
  );
}
