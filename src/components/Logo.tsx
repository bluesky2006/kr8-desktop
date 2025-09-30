export function Logo({ compact }: { compact?: boolean }) {
  return (
    <h1
      id="main_title"
      className={`text-8xl font-bold text-red-400 ${compact ? "mb-10" : "mb-36"}`}
    >
      kr8
    </h1>
  );
}
