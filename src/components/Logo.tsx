export function Logo({ compact }: { compact?: boolean }) {
  return (
    <h1
      id="main_title"
      className={`font-bold font-rubik-80s text-red-400 transition-all duration-300 ${compact ? "mb-8 text-6xl" : "mb-40 text-8xl"}`}
    >
      kr8
    </h1>
  );
}
