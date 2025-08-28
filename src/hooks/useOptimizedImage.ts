import { useState, useEffect } from 'react';
import { compressBase64Image, createThumbnail, createBlurredPlaceholder, getOptimalImageSize } from '../utils/imageOptimization';
import { imageCache } from '../utils/imageCache';

interface UseOptimizedImageOptions {
  enableThumbnail?: boolean;
  enablePlaceholder?: boolean;
  enableProgressive?: boolean;
  cacheKey?: string;
}

interface OptimizedImageData {
  originalUrl: string | null;
  optimizedUrl: string | null;
  thumbnailUrl: string | null;
  placeholderUrl: string | null;
  isLoading: boolean;
  isOptimizing: boolean;
  error: string | null;
}

// Simple in-memory cache with persistent storage integration
const optimizedImageCache = new Map<string, OptimizedImageData>();

export const useOptimizedImage = (
  originalBase64: string | null,
  options: UseOptimizedImageOptions = {}
) => {
  const {
    enableThumbnail = true,
    enablePlaceholder = true,
    enableProgressive = true,
    cacheKey
  } = options;

  const [imageData, setImageData] = useState<OptimizedImageData>({
    originalUrl: null,
    optimizedUrl: null,
    thumbnailUrl: null,
    placeholderUrl: null,
    isLoading: false,
    isOptimizing: false,
    error: null
  });

  useEffect(() => {
    if (!originalBase64) {
      setImageData({
        originalUrl: null,
        optimizedUrl: null,
        thumbnailUrl: null,
        placeholderUrl: null,
        isLoading: false,
        isOptimizing: false,
        error: null
      });
      return;
    }

    const processImage = async () => {
      try {
        const cacheKeyToUse = cacheKey || originalBase64.substring(0, 100);
        
        // Check our optimized cache first
        if (optimizedImageCache.has(cacheKeyToUse)) {
          const cached = optimizedImageCache.get(cacheKeyToUse)!;
          setImageData(cached);
          return;
        }

        // Check individual image cache
        const cachedOptimized = imageCache.get(originalBase64);
        if (cachedOptimized) {
          const result: OptimizedImageData = {
            originalUrl: originalBase64,
            optimizedUrl: cachedOptimized,
            thumbnailUrl: null,
            placeholderUrl: null,
            isLoading: false,
            isOptimizing: false,
            error: null
          };
          optimizedImageCache.set(cacheKeyToUse, result);
          setImageData(result);
          return;
        }

        setImageData(prev => ({
          ...prev,
          isLoading: true,
          isOptimizing: true,
          error: null
        }));

        const { width, height, quality } = getOptimalImageSize();
        
        // Process images in parallel for better performance
        const promises: Promise<any>[] = [];
        
        // Always create optimized version
        promises.push(
          compressBase64Image(originalBase64, quality, width, height)
        );

        // Create thumbnail if enabled
        if (enableThumbnail) {
          promises.push(createThumbnail(originalBase64));
        } else {
          promises.push(Promise.resolve(null));
        }

        // Create placeholder if enabled
        if (enablePlaceholder) {
          promises.push(createBlurredPlaceholder(originalBase64));
        } else {
          promises.push(Promise.resolve(null));
        }

        const [optimizedUrl, thumbnailUrl, placeholderUrl] = await Promise.all(promises);

        const result: OptimizedImageData = {
          originalUrl: originalBase64,
          optimizedUrl,
          thumbnailUrl,
          placeholderUrl,
          isLoading: false,
          isOptimizing: false,
          error: null
        };

        // Cache the results
        optimizedImageCache.set(cacheKeyToUse, result);
        if (optimizedUrl) {
          imageCache.set(originalBase64, optimizedUrl);
        }
        
        setImageData(result);

      } catch (error) {
        console.error('Image optimization failed:', error);
        setImageData(prev => ({
          ...prev,
          isLoading: false,
          isOptimizing: false,
          error: 'Falha ao otimizar imagem'
        }));
      }
    };

    processImage();
  }, [originalBase64, cacheKey, enableThumbnail, enablePlaceholder, enableProgressive]);

  // Log cache stats periodically in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(() => {
        const stats = imageCache.getStats();
        console.log('Image cache stats:', stats);
      }, 30000); // Every 30 seconds

      return () => clearInterval(interval);
    }
  }, []);

  return imageData;
};