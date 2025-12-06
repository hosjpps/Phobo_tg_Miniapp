import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui';

interface DishImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function DishImage({ src, alt, className = '' }: DishImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <Skeleton className="absolute inset-0" rounded="none" />
      )}

      {hasError ? (
        <div className="absolute inset-0 bg-neutral flex items-center justify-center">
          <span className="text-4xl">🍜</span>
        </div>
      ) : (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}
