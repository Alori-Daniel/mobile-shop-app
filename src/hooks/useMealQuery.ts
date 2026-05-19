import { fetchMealById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useMealQuery = (id: string) => {
  return useQuery({
    queryKey: ["meal", id],
    queryFn: () => fetchMealById(id),
    enabled: Boolean(id),
  });
};
