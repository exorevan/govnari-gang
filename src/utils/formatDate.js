export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" });
}


