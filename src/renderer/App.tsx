import React, { useCallback, useState } from "react";
import { extractTrackPaths } from "../utils/extractTrackPaths";
import { getParsedTrackMetadata } from "../utils/getParsedTrackMetadata";
import { postPlaylistsByUserId } from "../utils/postPlaylistsByUserId";
import { Logo } from "../components/Logo";
import { Dropzone } from "../components/Dropzone";
import { ActionsBar } from "../components/ActionsBar";
import { EditableTitle } from "../components/EditableTitle";
import { TrackList } from "../components/TrackList";
import { Track } from "../types/types";

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  const [playlistName, setPlaylistName] = useState("Playlist");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isParsingPlaylist, setIsParsingPlaylist] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadSuccessModal, setShowUploadSuccessModal] = useState(false);

  const withUpdatedPositions = useCallback(
    (items: Track[]) =>
      items.map((track, index) => ({
        ...track,
        playlist_position: index + 1,
      })),
    []
  );

  const handleFile = useCallback(async (file: any) => {
    if (isParsingPlaylist) return;
    setIsParsingPlaylist(true);
    try {
      setPlaylistName(file.name.replace(/\.[^/.]+$/, ""));
      const text = await file.text();
      const paths = await extractTrackPaths(text);
      const parsed = (await getParsedTrackMetadata(paths)) as Track[];

      await pause(750);
      setTracks(withUpdatedPositions(parsed));
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to parse playlist");
    } finally {
      setIsParsingPlaylist(false);
    }
  }, [isParsingPlaylist, withUpdatedPositions]);

  const handleStartAgain = useCallback(() => {
    setTracks([]);
    setPlaylistName("Playlist");
  }, []);

  const handleUpload = useCallback(async () => {
    if (isUploading) return;

    const normalizedPlaylistName = playlistName.trim();
    if (!normalizedPlaylistName) {
      alert("Please give this playlist a name before uploading.");
      return;
    }

    setIsUploading(true);

    try {
      const payload = {
        user_id: 1,
        playlist_name: normalizedPlaylistName,
        playlist_notes: "fake notes",
        favourite: false,
        playlist_tracks: tracks,
      };
      await postPlaylistsByUserId(1, payload);
      console.log("Upload OK");
      setShowUploadSuccessModal(true);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }, [isUploading, playlistName, tracks]);

  const handleMoveTrack = useCallback(
    (fromIndex: number, toIndex: number) => {
      setTracks((prev) => {
        if (
          fromIndex < 0 ||
          toIndex < 0 ||
          fromIndex >= prev.length ||
          toIndex >= prev.length ||
          fromIndex === toIndex
        ) {
          return prev;
        }

        const reordered = [...prev];
        const [movedTrack] = reordered.splice(fromIndex, 1);
        if (!movedTrack) return prev;

        reordered.splice(toIndex, 0, movedTrack);
        return withUpdatedPositions(reordered);
      });
    },
    [withUpdatedPositions]
  );

  const handleDeleteTrack = useCallback(
    (index: number) => {
      setTracks((prev) => {
        if (index < 0 || index >= prev.length) return prev;
        const filtered = prev.filter((_, i) => i !== index);
        return withUpdatedPositions(filtered);
      });
    },
    [withUpdatedPositions]
  );

  const handleToggleFavourite = useCallback((index: number) => {
    setTracks((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      return prev.map((track, i) =>
        i === index ? { ...track, favourite: !track.favourite } : track
      );
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-6">
      <div className="p-6 w-[90vmin] aspect-square max-w-4xl flex flex-col justify-center items-center bg-white rounded">
        <Logo compact={tracks.length > 0} />
        {tracks.length === 0 ? (
          <Dropzone onFile={handleFile} isParsing={isParsingPlaylist} />
        ) : (
          <>
            <ActionsBar
              onStartAgain={handleStartAgain}
              onUpload={handleUpload}
              isUploading={isUploading}
            />
            <EditableTitle value={playlistName} onChange={setPlaylistName} />
            <TrackList
              tracks={tracks}
              onMoveTrack={handleMoveTrack}
              onDeleteTrack={handleDeleteTrack}
              onToggleFavourite={handleToggleFavourite}
            />
          </>
        )}
      </div>
      {showUploadSuccessModal ? (
        <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-md shadow-xl p-4">
            <h3 className="text-base font-semibold mb-2">Upload complete</h3>
            <p className="text-sm text-gray-700 mb-4">
              "{playlistName}" was uploaded successfully.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowUploadSuccessModal(false)}
                className="px-3 py-2 rounded bg-gray-900 text-white text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
