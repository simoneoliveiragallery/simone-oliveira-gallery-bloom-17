// Advanced image caching utility

interface CacheEntry {
  data: string;
  timestamp: number;
  size: number;
  hits: number;
}

class ImageCacheManager {
  private cache = new Map<string, CacheEntry>();
  private maxCacheSize = 50 * 1024 * 1024; // 50MB
  private maxEntries = 100;
  private currentSize = 0;

  // Generate cache key from image data
  private generateKey(imageData: string): string {
    const hash = this.simpleHash(imageData.substring(0, 100));
    return `img_${hash}`;
  }

  // Simple hash function
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  // Estimate string size in bytes
  private getStringSize(str: string): number {
    return new Blob([str]).size;
  }

  // Cleanup old or least used entries
  private cleanup(): void {
    if (this.cache.size <= this.maxEntries && this.currentSize <= this.maxCacheSize) {
      return;
    }

    // Sort by hits (ascending) and timestamp (ascending) - remove least used and oldest first
    const entries = Array.from(this.cache.entries()).sort((a, b) => {
      const hitsDiff = a[1].hits - b[1].hits;
      if (hitsDiff !== 0) return hitsDiff;
      return a[1].timestamp - b[1].timestamp;
    });

    // Remove entries until we're under limits
    let removedSize = 0;
    let removedCount = 0;
    
    for (const [key, entry] of entries) {
      if (this.cache.size - removedCount <= this.maxEntries * 0.8 && 
          this.currentSize - removedSize <= this.maxCacheSize * 0.8) {
        break;
      }
      
      this.cache.delete(key);
      removedSize += entry.size;
      removedCount++;
    }

    this.currentSize -= removedSize;
    console.log(`Image cache cleanup: removed ${removedCount} entries, ${(removedSize / 1024 / 1024).toFixed(2)}MB`);
  }

  // Store image in cache
  set(imageData: string, processedData: string): void {
    try {
      const key = this.generateKey(imageData);
      const size = this.getStringSize(processedData);
      
      // Don't cache very large images
      if (size > 5 * 1024 * 1024) { // 5MB limit per image
        return;
      }

      // Remove existing entry if updating
      if (this.cache.has(key)) {
        const existing = this.cache.get(key)!;
        this.currentSize -= existing.size;
      }

      const entry: CacheEntry = {
        data: processedData,
        timestamp: Date.now(),
        size,
        hits: 1
      };

      this.cache.set(key, entry);
      this.currentSize += size;

      // Cleanup if needed
      this.cleanup();
    } catch (error) {
      console.warn('Failed to cache image:', error);
    }
  }

  // Retrieve image from cache
  get(imageData: string): string | null {
    try {
      const key = this.generateKey(imageData);
      const entry = this.cache.get(key);
      
      if (entry) {
        entry.hits++;
        entry.timestamp = Date.now(); // Update access time
        return entry.data;
      }
      
      return null;
    } catch (error) {
      console.warn('Failed to retrieve cached image:', error);
      return null;
    }
  }

  // Check if image is cached
  has(imageData: string): boolean {
    const key = this.generateKey(imageData);
    return this.cache.has(key);
  }

  // Clear entire cache
  clear(): void {
    this.cache.clear();
    this.currentSize = 0;
  }

  // Get cache statistics
  getStats(): { entries: number; sizeMB: number; hitRate: number } {
    const totalHits = Array.from(this.cache.values()).reduce((sum, entry) => sum + entry.hits, 0);
    return {
      entries: this.cache.size,
      sizeMB: Number((this.currentSize / 1024 / 1024).toFixed(2)),
      hitRate: totalHits / Math.max(this.cache.size, 1)
    };
  }
}

// Export singleton instance
export const imageCache = new ImageCacheManager();

// Initialize with localStorage persistence (optional)
export const initializePersistentCache = (): void => {
  try {
    // Check if localStorage is available and has space
    if (typeof Storage !== 'undefined' && localStorage) {
      // Try to save cache stats periodically
      setInterval(() => {
        const stats = imageCache.getStats();
        localStorage.setItem('imageCache_stats', JSON.stringify(stats));
      }, 60000); // Every minute
    }
  } catch (error) {
    console.warn('Failed to initialize persistent cache:', error);
  }
};