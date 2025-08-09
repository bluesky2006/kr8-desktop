export function getFormattedDateTime(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");

  // Database-safe format (local time)
  const dbFormat =
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

  // Friendly display format (local time)
  const friendlyFormat = `${date.toDateString()} at ${pad(date.getHours())}:${pad(date.getMinutes())}`;

  return { dbFormat, friendlyFormat };
}
