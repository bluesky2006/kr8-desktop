export function Logo({ compact }: { compact?: boolean }) {
  return (
    <h1
      id="main_title"
      className={`font-bold text-red-400 ${compact ? "mb-8 text-4xl" : "mb-36 text-8xl"}`}
    >
      kr8
    </h1>
  );
}
