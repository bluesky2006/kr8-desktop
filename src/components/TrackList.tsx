import { TrackCard } from "./TrackCard.js";
import { TrackListProps } from "../types/types.js";

export function TrackList({ tracks, onMoveTrack, onDeleteTrack, onToggleFavourite }: TrackListProps) {
  return (
    <section className="mt-2 w-full space-y-6">
      {tracks.map((track, index) => (
        <TrackCard
          key={index}
          track={track}
          isFirst={index === 0}
          isLast={index === tracks.length - 1}
          onMoveUp={() => onMoveTrack(index, index - 1)}
          onMoveDown={() => onMoveTrack(index, index + 1)}
          onToggleFavourite={() => onToggleFavourite(index)}
          onDelete={() => onDeleteTrack(index)}
        />
      ))}
    </section>
  );
}
