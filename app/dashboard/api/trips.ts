import { API_URL } from "@/constants";

export async function searchTrips(filters: any) {
  const { year, month, day, origin, destination } = filters;

  let date = "";
  if (year && month && day) {
    date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const params = new URLSearchParams();
  if (date) params.append("date", date);
  if (origin) params.append("origin", origin);
  if (destination) params.append("destination", destination);

  const res = await fetch(`${API_URL}/trips?${params.toString()}`);
  return res.json();
}