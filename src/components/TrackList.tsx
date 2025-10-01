import { TrackCard } from "./TrackCard.js";
import { TrackListProps } from "../types/types.js";

export function TrackList({ tracks }: TrackListProps) {
  return (
    <section className="mt-2 w-full space-y-6">
      {tracks.map((track, index) => (
        <TrackCard key={index} track={track} />
      ))}
    </section>
  );
}
