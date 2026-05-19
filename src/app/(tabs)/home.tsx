import ProductCard from "@/components/ProductCard";
import ScreenMessage from "@/components/ScreenMessage";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useMealsQuery } from "@/hooks/useMealsQuery";
import { useCartStore } from "@/store/cartStore";
import { Meal } from "@/types";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

type FilterKey = "all" | "discounted" | "topRated" | "budget";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "discounted", label: "Discounted" },
  { key: "topRated", label: "Top Rated" },
  { key: "budget", label: "Budget" },
];

const Home = () => {
  const { width } = useWindowDimensions();
  const numColumns = width >= 900 ? 3 : width >= 620 ? 2 : 1;

  const { data, isPending, isError, refetch } = useMealsQuery();
  const addToCart = useCartStore((state) => state.addToCart);

  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredMeals = useMemo(() => {
    const meals = data ?? [];

    return meals
      .filter((meal) =>
        meal.name.toLowerCase().includes(searchText.trim().toLowerCase()),
      )
      .filter((meal) => {
        if (activeFilter === "discounted") {
          return meal.discount > 0;
        }

        if (activeFilter === "topRated") {
          return meal.rating >= 70;
        }

        if (activeFilter === "budget") {
          return meal.price <= 25;
        }

        return true;
      })
      .sort((a, b) => b.rating - a.rating);
  }, [data, searchText, activeFilter]);

  const handleOpenProduct = (mealId: string) => {
    router.push(`/product/${mealId}`);
  };

  if (isPending) {
    return (
      <ScreenWrapper>
        <ScreenMessage
          loading
          title="Loading products"
          description="Fetching the latest meals for your catalog."
        />
      </ScreenWrapper>
    );
  }

  if (isError) {
    return (
      <ScreenWrapper>
        <ScreenMessage
          title="Unable to load products"
          description="Check your connection and try again."
          actionLabel="Retry"
          onAction={() => refetch()}
        />
      </ScreenWrapper>
    );
  }

  const renderProduct = ({ item }: { item: Meal }) => (
    <View
      style={[styles.cardWrapper, numColumns > 1 && styles.multiColumnCard]}
    >
      <ProductCard
        meal={item}
        onPress={() => handleOpenProduct(item.id)}
        onAddToCart={() => addToCart(item)}
      />
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>Browse Meals</Text>
        <Text style={styles.subtitle}>
          {filteredMeals.length} products found
        </Text>
      </View>

      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search by meal name"
        style={styles.searchInput}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map((filter) => {
          const isActive = filter.key === activeFilter;

          return (
            <Pressable
              key={filter.key}
              onPress={() => setActiveFilter(filter.key)}
              style={[
                styles.filterChip,
                isActive && styles.filterChipActive,
                { height: 34 },
              ]}
            >
              <Text
                style={[styles.filterText, isActive && styles.filterTextActive]}
              >
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        data={filteredMeals}
        key={numColumns}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No meals match this search</Text>
            <Text style={styles.emptyDescription}>
              Try changing your search text or filters.
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#475569",
  },
  searchInput: {
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
  },
  filterRow: {
    gap: 10,
    // borderWidth: 1,
    height: 50,
    marginBottom: 30,
    alignItems: "center",
    paddingVertical: 14,
  },
  filterChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterChipActive: {
    backgroundColor: "purple",
    borderColor: "purple",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingBottom: 24,
  },
  columnWrapper: {
    gap: 12,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  multiColumnCard: {
    flex: 1,
  },
  emptyState: {
    marginTop: 24,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    lineHeight: 20,
  },
});
