import { useState, useEffect } from 'react';

const STORAGE_KEY = 'viewed_notifications';

export function useViewedState() {
  const [viewedIds, setViewedIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch (e) {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(viewedIds)));
    } catch (e) {
      console.error('Failed to save viewed state to localStorage', e);
    }
  }, [viewedIds]);

  const markAsViewed = (id) => {
    if (!viewedIds.has(id)) {
      setViewedIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    }
  };

  const isViewed = (id) => viewedIds.has(id);

  return { markAsViewed, isViewed };
}
