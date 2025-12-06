import React from 'react';

interface SkeletonProps {
  className?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const roundedStyles = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export function Skeleton({ className = '', rounded = 'md' }: SkeletonProps) {
  return (
    <div
      className={`
        animate-pulse bg-neutral-200
        ${roundedStyles[rounded]}
        ${className}
      `}
    />
  );
}

// Pre-built skeleton variants
export function SkeletonText({ lines = 1, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return <Skeleton className={sizeStyles[size]} rounded="full" />;
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-card">
      <Skeleton className="h-40 w-full mb-4" rounded="xl" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2 mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-8 w-8" rounded="full" />
      </div>
    </div>
  );
}

export function SkeletonMenuCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card">
      <Skeleton className="h-36 w-full" rounded="none" />
      <div className="p-3">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-3" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-8" rounded="full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCartItem() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-card flex gap-4">
      <Skeleton className="w-20 h-20 flex-shrink-0" rounded="xl" />
      <div className="flex-1 min-w-0">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-3" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-24" rounded="full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonOrderCard() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-6 w-24" rounded="full" />
      </div>
      <Skeleton className="h-3 w-1/2 mb-2" />
      <Skeleton className="h-3 w-2/3 mb-4" />
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-9 w-28" rounded="xl" />
      </div>
    </div>
  );
}
