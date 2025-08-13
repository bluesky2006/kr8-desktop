import { TrackCard } from "./TrackCard.jsx";

export function TrackList({ tracks }) {
  return (
    <section className="mt-2 w-full space-y-6">
      {tracks.map((track, i) => (
        <TrackCard key={i} track={track} />
      ))}
    </section>
  );
}
