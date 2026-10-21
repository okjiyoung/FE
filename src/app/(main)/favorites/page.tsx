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
  getFavoriteStretchings,
  UserFavoriteStretchingResponse,
} from "@/features/favorites/api/favoriteStretching";
import { getMyInfo } from "@/features/auth/api/user";
import { ApiError } from "@/services/apiClient";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyInfo()
      .then((me) => getFavoriteStretchings(me.id))
      .then((list) => setRoutines(list.map(toFavoriteRoutine)))
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

  const handleToggleFavorite = (id: string) => {
    // 서버에서 즐겨찾기를 삭제하는 API 연동은 아직 없어서 화면에서만 제거함
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
