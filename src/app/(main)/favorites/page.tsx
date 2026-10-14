"use client";

import { useState } from "react";
import FavoritesHeader from "@/features/favorites/components/FavoriteHeader";
import FilterChips, {
  FilterType,
} from "@/features/favorites/components/FilterChips";
import FavoriteListSection from "@/features/favorites/components/FavoriteListSection";
import { FavoriteRoutine } from "@/features/favorites/types/favorite";

const MOCK_ROUTINES: FavoriteRoutine[] = [
  {
    id: "1",
    durationText: "3분 · 5개 동작",
    title: "얼굴 / 어깨",
    createdAtText: "12시간 전",
    tags: ["서 있음", "집", "티 나지 않게"],
    isFavorite: true,
    category: "3min_or_less",
  },
  {
    id: "2",
    durationText: "3분 · 5개 동작",
    title: "얼굴 / 어깨",
    createdAtText: "1일 전",
    tags: ["서 있음", "집", "티 나지 않게"],
    isFavorite: true,
    category: "3min_or_less",
  },
  {
    id: "3",
    durationText: "3분 · 5개 동작",
    title: "얼굴 / 어깨",
    createdAtText: "9월 24일",
    tags: ["서 있음", "집", "티 나지 않게"],
    isFavorite: true,
    category: "3min_or_less",
  },
  {
    id: "4",
    durationText: "5분 · 7개 동작",
    title: "목 / 어깨 집중",
    createdAtText: "9월 20일",
    tags: ["앉아있음", "사무실", "티 나지 않게"],
    isFavorite: true,
    category: "4min_or_more",
  },
  {
    id: "5",
    durationText: "4분 · 6개 동작",
    title: "전신 스트레칭",
    createdAtText: "9월 15일",
    tags: ["서 있음", "야외", "크게 움직임"],
    isFavorite: true,
    category: "4min_or_more",
  },
];

export default function FavoritesPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [routines, setRoutines] = useState<FavoriteRoutine[]>(MOCK_ROUTINES);

  const filteredRoutines = routines.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.category === selectedFilter;
  });

  const handleToggleFavorite = (id: string) => {
    setRoutines((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCardClick = (id: string) => {};

  return (
    <main className="flex flex-col items-start w-full p-[24px] gap-[16px] flex-1 bg-[#F7F7F7] rounded-[32px]">
      <FavoritesHeader />
      <FilterChips
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />
      <FavoriteListSection
        routines={filteredRoutines}
        onCardClick={handleCardClick}
        onToggleFavorite={handleToggleFavorite}
      />
    </main>
  );
}
