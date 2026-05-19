import { Meal } from "@/types";

const API_BASE_URL = "https://6a0c4e365aa893e1015b7853.mockapi.io/api/v1";

type MealResponse = {
  id: string;
  name: string;
  price: number | string;
  discount: number | string;
  rating: number | string;
  image: string;
};

const toMeal = (meal: MealResponse): Meal => ({
  id: String(meal.id),
  name: meal.name,
  price: Number(meal.price),
  discount: Number(meal.discount),
  rating: Number(meal.rating),
  image: meal.image,
});

const request = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};

export const fetchMeals = async () => {
  const meals = await request<MealResponse[]>("/meals");
  return meals.map(toMeal);
};

export const fetchMealById = async (id: string) => {
  const meal = await request<MealResponse>(`/meals/${id}`);
  return toMeal(meal);
};
