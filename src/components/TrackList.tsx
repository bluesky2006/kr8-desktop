import { TrackCard } from "./TrackCard.js";

interface TrackListProps {
  tracks: Array<any>;
}

export function TrackList({ tracks }: TrackListProps) {
  return (
    <section className="mt-2 w-full space-y-6">
      {tracks.map((track, i) => (
        <TrackCard key={i} track={track} />
      ))}
    </section>
  );
}
