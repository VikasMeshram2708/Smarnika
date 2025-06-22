/**
 * Content optimization utilities to reduce webpack cache issues
 */

/**
 * Optimize JSON stringification with size monitoring
 */
export function optimizeJsonStringify<T>(data: T): string {
  const jsonString = JSON.stringify(data);

  // Monitor large content
  const sizeKB = jsonString.length / 1024;

  if (sizeKB > 100) {
    console.warn(`Large content detected: ${sizeKB.toFixed(2)}KB`);
  }

  if (sizeKB > 500) {
    console.error(
      `Very large content detected: ${sizeKB.toFixed(
        2
      )}KB - consider chunking or compression`
    );
  }

  return jsonString;
}

/**
 * Safely parse JSON with error handling
 */
export function safeJsonParse<T>(jsonString: string | null, fallback: T): T {
  if (!jsonString) return fallback;

  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return fallback;
  }
}

/**
 * Compress large content using simple techniques
 */
export function compressContent(content: string): string {
  // Remove unnecessary whitespace for large content
  if (content.length > 50 * 1024) {
    // 50KB threshold
    return content.replace(/\s+/g, " ").trim();
  }

  return content;
}

/**
 * Decompress content if needed
 */
export function decompressContent(content: string): string {
  // For now, just return as-is since we're using simple compression
  // In the future, you could implement actual compression algorithms
  return content;
}

/**
 * Check if content is large enough to warrant optimization
 */
export function isLargeContent(content: string): boolean {
  return content.length > 100 * 1024; // 100KB threshold
}

/**
 * Get content size in human-readable format
 */
export function getContentSize(content: string): string {
  const bytes = content.length;
  const kb = bytes / 1024;
  const mb = kb / 1024;

  if (mb >= 1) {
    return `${mb.toFixed(2)}MB`;
  }

  return `${kb.toFixed(2)}KB`;
}
