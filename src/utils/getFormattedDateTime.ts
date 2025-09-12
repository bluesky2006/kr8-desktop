export function getFormattedDateTime(date = new Date()) {
  function pad(n: number) {
    return String(n).padStart(2, "0");
  }

  // Database-safe format (local time) - probably redundant if generating on database
  const dbFormat =
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

  // Friendly display format (local time)
  const friendlyFormat = `${date.toDateString()} at ${pad(date.getHours())}:${pad(date.getMinutes())}`;

  return { dbFormat, friendlyFormat };
}
