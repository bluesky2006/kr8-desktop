import { Artwork } from "./Artwork.jsx";
import { convertLengthToTime } from "../utils/convertLengthToTime.js";

export function TrackCard({ track }) {
  return (
    <div className="relative overflow-hidden flex items-stretch justify-between bg-gray-50 rounded p-3 shadow">
      {/* Small corner triangle with number */}
      <div className="absolute top-0 right-0">
        <div className="relative">
          <div className="w-0 h-0 border-t-[48px] border-l-[48px] border-t-red-500 border-l-transparent" />
          <span className="absolute top-[6px] right-[8px] text-white text-sm font-semibold">
            {track.playlist_position}
          </span>
        </div>
      </div>

      {/* Left column */}
      <div className="min-w-0 pr-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold leading-snug break-words">
            {track.track_title || "Untitled Track"}
          </h2>
          <h3 className="text-base font-medium text-gray-600 truncate">
            {track.track_artist || "Unknown Artist"}
          </h3>
        </div>

        {/* Badges at bottom */}
        <div className="flex gap-2 text-xs">
          <span className="bg-red-400 text-white px-2 py-1 rounded-md">
            {track.track_bpm ? `${track.track_bpm} BPM` : "BPM N/A"}
          </span>
          <span className="bg-red-400 text-white px-2 py-1 rounded-md">
            {track.track_length ? convertLengthToTime(track.track_length) : "Length N/A"}
          </span>
        </div>
      </div>

      {/* Artwork */}
      <div className="w-28 h-28 shrink-0">
        <Artwork data={track.track_image} />
      </div>
    </div>
  );
}
