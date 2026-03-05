import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdStar, MdStarBorder } from "react-icons/md";
import { Artwork } from "./Artwork.js";
import { convertLengthToTime } from "../utils/convertLengthToTime.js";
import { TrackCardProps } from "../types/types.js";

export function TrackCard({
  track,
  onMoveUp,
  onMoveDown,
  onToggleFavourite,
  onDelete,
  isFirst,
  isLast,
}: TrackCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden flex items-stretch justify-between bg-gray-50 rounded p-3 shadow-lg">
        <div className="absolute inset-y-2 left-2 flex flex-col justify-center gap-1.5">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            className="w-6 h-6 rounded bg-white border border-red-300 text-sm disabled:opacity-40 text-red-400"
            aria-label="Move track up"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            className="w-6 h-6 rounded bg-white border border-red-300 text-sm disabled:opacity-40 text-red-400"
            aria-label="Move track down"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onToggleFavourite}
            className="w-6 h-6 rounded bg-white text-red-400 border border-red-300 flex items-center justify-center"
            aria-label={track.favourite ? "Unfavourite track" : "Favourite track"}
          >
            {track.favourite ? <MdStar /> : <MdStarBorder />}
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="w-6 h-6 rounded bg-white text-red-400 border border-red-300 flex items-center justify-center"
            aria-label="Delete track"
          >
            <MdDelete />
          </button>
        </div>

        <div className="absolute top-0 right-0">
          <div className="relative">
            <div className="w-0 h-0 border-t-[48px] border-l-[48px] border-t-red-500 border-l-transparent" />
            <span className="absolute top-[6px] right-[6px] text-white text-xs font-semibold">
              {track.playlist_position}
            </span>
          </div>
        </div>

        <div className="min-w-0 pr-4 pl-9 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold leading-snug break-words">
              {track.track_title || "Untitled Track"}
            </h2>
            <h3 className="text-base font-medium text-gray-600 truncate">
              {track.track_artist || "Unknown Artist"}
            </h3>
          </div>

          <div className="flex gap-2 text-xs">
            <span className="bg-red-400 text-white px-2 py-1 rounded-md">
              {track.track_bpm ? `${track.track_bpm} BPM` : "BPM N/A"}
            </span>
            <span className="bg-red-400 text-white px-2 py-1 rounded-md">
              {track.track_length ? convertLengthToTime(track.track_length) : "Length N/A"}
            </span>
          </div>
        </div>

        <div className="w-28 h-28 shrink-0 border border-gray-300 rounded">
          <Artwork image={track.track_image} />
        </div>
      </div>

      {showDeleteModal ? (
        <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-md shadow-xl p-4">
            <h3 className="text-base font-semibold mb-2">Delete track?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Remove "{track.track_title || "Untitled Track"}" from this playlist?
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-2 rounded bg-gray-200 text-gray-900 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  onDelete();
                }}
                className="px-3 py-2 rounded bg-red-500 text-white text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
