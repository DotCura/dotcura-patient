// usePaginatedList.ts
// Reusable pagination hook aligned with APIManager custom response codes
// NO AbortController
// Uses requestId guarding to ignore stale responses
// API codes:
// 1 = SUCCESS
// 2 = NO_DATA_FOUND
// 0 = INVALID / FAIL

import { useCallback, useEffect, useRef, useState } from 'react';

export enum LoadType {
  INITIAL = 'INITIAL',
  REFRESH = 'REFRESH',
  LOAD_MORE = 'LOAD_MORE',
  TAB_CHANGE = 'TAB_CHANGE',
}

export interface ApiResponse<T> {
  code: 0 | 1 | 2;
  data?: T[];
  message?: string;
}

interface UsePaginatedListProps<T> {
  pageSize: number;
  enabled?: boolean;
  searchQuery?: string; // debounced externally
  fetcher: (params: {
    page: number;
    searchQuery?: string;
    loadType: LoadType;
  }) => Promise<ApiResponse<T>>;
}

export function usePaginatedList<T>({
  pageSize,
  enabled = true,
  searchQuery,
  fetcher,
}: UsePaginatedListProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestIdRef = useRef(0);
  const onEndReachedGuard = useRef(false);
  const blockLoadMoreRef = useRef(false);

  const nextRequestId = () => {
    requestIdRef.current += 1;
    return requestIdRef.current;
  };

  const stopLoaders = () => {
    setLoading(false);
    setRefreshing(false);
    setLoadingMore(false);
    onEndReachedGuard.current = false;
  };

  const request = useCallback(
    async (loadType: LoadType, pageToLoad = 1) => {
      if (!enabled) return;

      setError(null);

      if (loadType === LoadType.INITIAL || loadType === LoadType.TAB_CHANGE) {
        blockLoadMoreRef.current = true;
        setLoading(true);
      }
      if (loadType === LoadType.REFRESH) setRefreshing(true);
      if (loadType === LoadType.LOAD_MORE) setLoadingMore(true);

      const requestId = nextRequestId();

      const res = await fetcher({ page: pageToLoad, searchQuery , loadType,});

      // Ignore stale responses
      if (requestId !== requestIdRef.current) return;

      switch (res.code) {
        case 1: {
          const incoming = res.data ?? [];

          const nextHasMore = incoming.length === pageSize;

          setHasMore(nextHasMore);
          setPage(pageToLoad);

          setData(prev => {
            onEndReachedGuard.current = false;
            return loadType === LoadType.LOAD_MORE
              ? [...prev, ...incoming]
              : incoming;
          });
          

          if (pageToLoad === 1) {
            blockLoadMoreRef.current = false; // 🔓 unlock
            onEndReachedGuard.current = false;
          }

          break;
        }

        case 2: {
          // NO DATA FOUND
          if (pageToLoad === 1) {
            setData([]);
            blockLoadMoreRef.current = false; // 🔓 unlock
          }
          setHasMore(false);
          break;
        }

        case 0: {
          // INVALID / FAIL
          setHasMore(false);
          setError(res.message || 'Something went wrong');
          break;
        }

        default:
          break;
      }

      if (requestId === requestIdRef.current) {
        stopLoaders();
      }
    },
    [enabled, fetcher, pageSize, searchQuery],
  );

  /* Public API */
  const loadInitial = useCallback(() => {
    setHasMore(true);
    request(LoadType.INITIAL, 1);
  }, [request]);

  const refresh = useCallback(() => {
    setHasMore(true);
    request(LoadType.REFRESH, 1);
  }, [request]);

  const loadMore = useCallback(() => {
    console.log('loading', loading);
    console.log('loadingMore', loadingMore);
    console.log('refreshing', refreshing);
    console.log('onEndReachedGuard', onEndReachedGuard);
    console.log('hasMore', hasMore);
    if (blockLoadMoreRef.current) return;

    if (loading || loadingMore || refreshing) return;
    if (!hasMore) return;
    if (onEndReachedGuard.current) return;

    onEndReachedGuard.current = true;
    request(LoadType.LOAD_MORE, page + 1);
  }, [hasMore, loading, loadingMore, page, refreshing, request]);

  const reset = useCallback(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    request(LoadType.TAB_CHANGE, 1);
  }, [request]);

  /* React to debounced search */
  useEffect(() => {
    if (!enabled) return;
    reset();
  }, [searchQuery]);

  /* Initial load & enable switch */
  useEffect(() => {
    if (enabled) loadInitial();
  }, [enabled]);

  return {
    data,
    loading,
    refreshing,
    loadingMore,
    hasMore,
    error,
    loadInitial,
    refresh,
    loadMore,
    reset,
  };
}

/*
BEHAVIOR SUMMARY:
- code 1 → merge / replace data
- code 2 → empty state or pagination end (NOT an error)
- code 0 → stop pagination + expose error
- stale responses ignored via requestId
- reusable with or without tabs
*/
