"use client";

import { useEffect, useState } from "react";

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<{
    navigationStart: number;
    domContentLoaded: number;
    loadComplete: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const navigationStart = performance.timing?.navigationStart || Date.now();

      const handleLoad = () => {
        const domContentLoaded =
          performance.timing?.domContentLoadedEventEnd || Date.now();
        const loadComplete = performance.timing?.loadEventEnd || Date.now();

        setMetrics({
          navigationStart,
          domContentLoaded,
          loadComplete,
        });

        // Log performance metrics in development
        if (process.env.NODE_ENV === "development") {
          console.log("Performance Metrics:", {
            "DOM Content Loaded": domContentLoaded - navigationStart + "ms",
            "Page Load Complete": loadComplete - navigationStart + "ms",
          });
        }
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== "development" || !metrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
      <div>DOM: {metrics.domContentLoaded - metrics.navigationStart}ms</div>
      <div>Load: {metrics.loadComplete - metrics.navigationStart}ms</div>
    </div>
  );
}
