"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  contentSize: string;
  loadTime: number;
  timestamp: number;
}

interface ContentSizeEvent extends CustomEvent {
  detail: {
    size: string;
    loadTime: number;
  };
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run in development and client-side
    if (process.env.NODE_ENV !== "development" || !isClient) return;

    const handleContentSize = (event: ContentSizeEvent) => {
      const { size, loadTime } = event.detail;
      setMetrics((prev) => [
        ...prev,
        {
          contentSize: size,
          loadTime,
          timestamp: Date.now(),
        },
      ]);
    };

    window.addEventListener(
      "content-size-logged",
      handleContentSize as EventListener
    );

    return () => {
      window.removeEventListener(
        "content-size-logged",
        handleContentSize as EventListener
      );
    };
  }, [isClient]);

  // Only show in development and client-side
  if (
    process.env.NODE_ENV !== "development" ||
    !isClient ||
    metrics.length === 0
  ) {
    return null;
  }

  const latestMetric = metrics[metrics.length - 1];
  const avgLoadTime =
    metrics.reduce((sum, m) => sum + m.loadTime, 0) / metrics.length;

  return (
    <div className="fixed bottom-4 right-4 bg-background border rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <h3 className="font-semibold text-sm mb-2">Performance Monitor</h3>
      <div className="space-y-1 text-xs">
        <div>Latest Content: {latestMetric.contentSize}</div>
        <div>Latest Load: {latestMetric.loadTime.toFixed(2)}ms</div>
        <div>Avg Load: {avgLoadTime.toFixed(2)}ms</div>
        <div>Total Logs: {metrics.length}</div>
      </div>
    </div>
  );
}

// Utility function to log content size from anywhere in the app
export function logContentSize(size: string, loadTime: number = 0) {
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    try {
      window.dispatchEvent(
        new CustomEvent("content-size-logged", {
          detail: { size, loadTime },
        })
      );
    } catch (error) {
      console.warn("Failed to log content size:", error);
    }
  }
}
