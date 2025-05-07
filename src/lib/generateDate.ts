export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const dd = String(date.getDate()).padStart(2, "0");
  const monthName = date.toLocaleString("default", { month: "long" }); // e.g. "May"
  const yyyy = date.getFullYear();
  return `${dd}, ${monthName} ${yyyy}`;
};
