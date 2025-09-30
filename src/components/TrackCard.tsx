import { Artwork } from "./Artwork.js";
import { convertLengthToTime } from "../utils/convertLengthToTime.js";

interface track {
  playlist_position: number;
  track_title: string;
  track_artist: string;
  track_bpm: number | null;
  track_length: number | null;
  track_image: ArrayBuffer | null;
}

interface TrackCardProps {
  track: track;
}

export function TrackCard({ track }: TrackCardProps) {
  return (
    <div className="relative overflow-hidden flex items-stretch justify-between bg-gray-50 rounded p-3 shadow-lg">
      {/* Corner triangle with number */}
      <div className="absolute top-0 right-0">
        <div className="relative">
          <div className="w-0 h-0 border-t-[48px] border-l-[48px] border-t-red-500 border-l-transparent" />
          <span className="absolute top-[6px] right-[8px] text-white text-sm font-semibold">
            {track.playlist_position}
          </span>
        </div>
      </div>

      {/* Title and artist*/}
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
      <div className="w-28 h-28 shrink-0 border border-gray-300 rounded">
        <Artwork data={track.track_image} />
      </div>
    </div>
  );
}
