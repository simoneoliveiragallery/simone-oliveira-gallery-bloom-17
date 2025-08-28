// Utility functions for image optimization

/**
 * Compresses base64 image data
 */
export const compressBase64Image = (
  base64: string, 
  quality: number = 0.8,
  maxWidth: number = 1200,
  maxHeight: number = 1200
): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions maintaining aspect ratio
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Convert to WebP if supported, otherwise JPEG
      const format = supportsWebP() ? 'image/webp' : 'image/jpeg';
      const compressed = canvas.toDataURL(format, quality);
      
      resolve(compressed);
    };
    
    img.src = base64;
  });
};

/**
 * Creates a thumbnail version of the image
 */
export const createThumbnail = (
  base64: string,
  width: number = 400,
  height: number = 400
): Promise<string> => {
  return compressBase64Image(base64, 0.7, width, height);
};

/**
 * Creates a blurred placeholder
 */
export const createBlurredPlaceholder = (
  base64: string,
  blur: number = 20
): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Very small size for placeholder
      canvas.width = 40;
      canvas.height = 40;
      
      if (ctx) {
        ctx.filter = `blur(${blur}px)`;
        ctx.drawImage(img, 0, 0, 40, 40);
        
        const placeholder = canvas.toDataURL('image/jpeg', 0.1);
        resolve(placeholder);
      }
    };
    
    img.src = base64;
  });
};

/**
 * Check if browser supports WebP
 */
export const supportsWebP = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

/**
 * Preload image
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Get optimal image size based on device and container
 */
export const getOptimalImageSize = (): { width: number; height: number; quality: number } => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const screenWidth = window.innerWidth;
  
  if (screenWidth <= 640) {
    // Mobile
    return {
      width: Math.min(600 * devicePixelRatio, 800),
      height: Math.min(600 * devicePixelRatio, 800),
      quality: 0.75
    };
  } else if (screenWidth <= 1024) {
    // Tablet
    return {
      width: Math.min(800 * devicePixelRatio, 1000),
      height: Math.min(800 * devicePixelRatio, 1000),
      quality: 0.8
    };
  } else {
    // Desktop
    return {
      width: Math.min(1200 * devicePixelRatio, 1400),
      height: Math.min(1200 * devicePixelRatio, 1400),
      quality: 0.85
    };
  }
};