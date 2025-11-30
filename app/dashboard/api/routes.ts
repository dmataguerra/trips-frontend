import { API_URL } from "@/constants";
import { Route } from "@/entities";

export const getRoutes = async (): Promise<Route[]> => {
  const res = await fetch(`${API_URL}/routes`);
  return res.json();
};
