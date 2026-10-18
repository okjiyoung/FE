"use client";

import { useCallback, useState } from "react";
import { ApiError } from "@/services/apiClient";

interface UseApiRequestResult<T, Args extends unknown[]> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  execute: (...args: Args) => Promise<T | null>;
}

export function useApiRequest<T, Args extends unknown[]>(
  requestFn: (...args: Args) => Promise<T>
): UseApiRequestResult<T, Args> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (...args: Args) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await requestFn(...args);
        setData(result);
        return result;
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "알 수 없는 오류가 발생했습니다.";
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [requestFn]
  );

  return { data, isLoading, error, execute };
}
