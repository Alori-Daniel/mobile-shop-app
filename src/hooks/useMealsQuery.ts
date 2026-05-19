import { fetchMeals } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useMealsQuery = () => {
  return useQuery({
    queryKey: ["meals"],
    queryFn: fetchMeals,
  });
};
