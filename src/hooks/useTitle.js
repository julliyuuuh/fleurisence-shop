import { useEffect } from "react";

const BASE = "Fleurisence";

// Sets the browser tab title for a page, e.g. "Shop · Fleurisence".
export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : `${BASE} · Flowers for every moment`;
  }, [title]);
}
