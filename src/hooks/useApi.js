import { useState, useEffect, useCallback } from "react";

/**
 * Generic hook untuk fetch API dengan loading & error state.
 *
 * @param {Function} fetcher  — fungsi async yang return data
 * @param {Array}    deps     — dependency array (opsional)
 *
 * @returns {{ data, isLoading, error, refetch }}
 */
export function useApi(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { data, isLoading, error, refetch: run };
}
