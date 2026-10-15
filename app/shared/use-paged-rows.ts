"use client";

import { useMemo, useState } from "react";

/** Default rows shown per page for directory-style tables. */
export const DEFAULT_PAGE_SIZE = 25;

export interface PagedRows<T> {
  pageRows: T[];
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
  /** 1-based index of the first row on the page, or 0 when there are no rows. */
  firstIndex: number;
  /** 1-based index of the last row on the page, or 0 when there are no rows. */
  lastIndex: number;
  setPage: (page: number) => void;
}

/**
 * Client-side paging for a fully loaded row set. The list keeps every row so search and totals stay
 * correct over the whole set; only the rendered slice is limited, which is what makes large
 * directories cheap to render.
 *
 * `resetKey` (typically the search string) returns to the first page whenever it changes, and the page
 * is clamped so a shrinking result set can never leave the view on an empty page.
 */
export function usePagedRows<T>(rows: T[], options: { pageSize?: number; resetKey?: unknown } = {}): PagedRows<T> {
  const pageSize = options.pageSize ?? DEFAULT_PAGE_SIZE;
  const resetKey = options.resetKey;
  const [pager, setPager] = useState<{ page: number; resetKey: unknown }>({ page: 1, resetKey });
  // A changed resetKey (typically the search string) starts over at page one. Deriving it here instead
  // of resetting it from an effect avoids the extra cascading render that `setState` inside
  // `useEffect` would cause.
  const requestedPage = pager.resetKey === resetKey ? pager.page : 1;
  const total = rows.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  // Clamp on read so a shrinking result set can never leave the view stuck on an empty page.
  const safePage = Math.min(Math.max(1, requestedPage), pageCount);
  const setPage = (next: number) => setPager({ page: next, resetKey });

  const pageRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, safePage, pageSize]);

  return {
    pageRows,
    page: safePage,
    pageCount,
    pageSize,
    total,
    firstIndex: total === 0 ? 0 : (safePage - 1) * pageSize + 1,
    lastIndex: Math.min(safePage * pageSize, total),
    setPage,
  };
}
