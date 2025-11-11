import { useState, useEffect } from "react";
import { dataLoaders } from "../utils/dataLoader";

export function useData(loaderName, ...args) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const loader = dataLoaders[loaderName];
        if (!loader) {
          throw new Error(`Unknown loader: ${loaderName}`);
        }

        const result = await loader(...args);

        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          console.error(`Error loading ${loaderName}:`, err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [loaderName, ...args]);

  return { data, loading, error };
}
