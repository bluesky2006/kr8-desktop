export function convertLengthToTime(length: number) {
  const minutes = Math.floor(length / 60);
  const seconds = Math.floor(length % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
