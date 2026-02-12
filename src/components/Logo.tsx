export function Logo({ compact }: { compact?: boolean }) {
  return (
    <img
      id="main_title"
      src="/kr8-logo.png"
      alt="kr8 logo"
      className={`transition-all duration-300 ${
        compact ? "mb-8 w-48" : "mb-40 w-52"
      }`}
    />
  );
}