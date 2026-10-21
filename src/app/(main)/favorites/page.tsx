"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FavoritesHeader from "@/features/favorites/components/FavoriteHeader";
import FilterChips, {
  FilterType,
} from "@/features/favorites/components/FilterChips";
import FavoriteListSection from "@/features/favorites/components/FavoriteListSection";
import { FavoriteRoutine } from "@/features/favorites/types/favorite";
import {
  deleteFavoriteStretching,
  getFavoriteStretchings,
  UserFavoriteStretchingResponse,
} from "@/features/favorites/api/favoriteStretching";
import { getMyInfo } from "@/features/auth/api/user";
import { ApiError } from "@/services/apiClient";
import { StretchingResponse } from "@/features/stretching/api/stretching";
import { saveStretchingPlan } from "@/features/stretching/stretchingPlan";

function formatRelativeDate(iso: string): string {
  const createdAt = new Date(iso);
  const diffMs = Date.now() - createdAt.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));
    return `${diffMinutes}분 전`;
  }
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }
  return `${createdAt.getMonth() + 1}월 ${createdAt.getDate()}일`;
}

function toFavoriteRoutine(
  res: UserFavoriteStretchingResponse,
): FavoriteRoutine {
  const totalSeconds = res.stretchings.reduce(
    (sum, s) => sum + s.durationSeconds,
    0,
  );
  const totalMinutes = Math.round(totalSeconds / 60);
  const areas = Array.from(new Set(res.stretchings.map((s) => s.area)));

  return {
    id: String(res.id),
    durationText: `${totalMinutes}분 · ${res.stretchings.length}개 동작`,
    title: res.title,
    createdAtText: formatRelativeDate(res.createdAt),
    tags: areas,
    isFavorite: true,
    category: totalSeconds <= 180 ? "3min_or_less" : "4min_or_more",
  };
}

export default function FavoritesPage() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [routines, setRoutines] = useState<FavoriteRoutine[]>([]);
  const [favoritesById, setFavoritesById] = useState<
    Record<string, UserFavoriteStretchingResponse>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyInfo()
      .then((me) => getFavoriteStretchings(me.id))
      .then((list) => {
        setRoutines(list.map(toFavoriteRoutine));
        setFavoritesById(
          Object.fromEntries(list.map((res) => [String(res.id), res])),
        );
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.replace("/login");
          return;
        }
        setError("즐겨찾기 목록을 불러오지 못했어요.");
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  const filteredRoutines = routines.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.category === selectedFilter;
  });

  const handleToggleFavorite = async (id: string) => {
    const removed = routines.find((item) => item.id === id);
    setRoutines((prev) => prev.filter((item) => item.id !== id));

    try {
      await deleteFavoriteStretching(Number(id));
    } catch {
      if (removed) {
        setRoutines((prev) => [...prev, removed]);
      }
      setError("즐겨찾기 삭제에 실패했어요.");
    }
  };

  const handleCardClick = (id: string) => {
    const favorite = favoritesById[id];
    if (!favorite || favorite.stretchings.length === 0) return;

    const plan: StretchingResponse[] = [...favorite.stretchings]
      .sort((a, b) => a.sequenceOrder - b.sequenceOrder)
      .map(({ id, name, level, area, description, durationSeconds }) => ({
        id,
        name,
        level,
        area,
        description,
        durationSeconds,
      }));

    saveStretchingPlan(plan);
    router.push("/stretching");
  };

  return (
    <main className="flex min-h-[844px] flex-col items-start w-full p-[24px] gap-[16px] bg-[#F7F7F7] rounded-[32px]">
      <FavoritesHeader />
      <FilterChips
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      {error && (
        <p className="font-pretendard text-[14px] font-medium text-[#DF5757]">
          {error}
        </p>
      )}

      {isLoading ? (
        <p className="font-pretendard text-[14px] text-teum-muted">
          불러오는 중...
        </p>
      ) : (
        <FavoriteListSection
          routines={filteredRoutines}
          onCardClick={handleCardClick}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </main>
  );
}
