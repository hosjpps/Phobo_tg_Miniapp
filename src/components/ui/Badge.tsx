import React from 'react';
import { Flame, Leaf, Star, Sparkles } from 'lucide-react';

type BadgeVariant = 'default' | 'bestseller' | 'new' | 'spicy' | 'vegetarian' | 'success' | 'warning' | 'error';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  showIcon?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-neutral-200 text-text',
  bestseller: 'bg-accent/20 text-accent',
  new: 'bg-secondary/20 text-secondary',
  spicy: 'bg-error/20 text-error',
  vegetarian: 'bg-success/20 text-success',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  error: 'bg-error/20 text-error',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

const defaultIcons: Partial<Record<BadgeVariant, React.ReactNode>> = {
  bestseller: <Star className="w-3 h-3 fill-current" />,
  new: <Sparkles className="w-3 h-3" />,
  spicy: <Flame className="w-3 h-3" />,
  vegetarian: <Leaf className="w-3 h-3" />,
};

export function Badge({
  variant = 'default',
  size = 'sm',
  icon,
  showIcon = true,
  children,
  className = '',
}: BadgeProps) {
  const iconToShow = icon || (showIcon ? defaultIcons[variant] : null);

  return (
    <span
      className={`
        inline-flex items-center gap-1 font-medium rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {iconToShow}
      {children}
    </span>
  );
}

// Specialized badge components for common use cases
export function BestsellerBadge() {
  return (
    <Badge variant="bestseller" size="sm">
      Хит
    </Badge>
  );
}

export function NewBadge() {
  return (
    <Badge variant="new" size="sm">
      Новинка
    </Badge>
  );
}

export function SpicyBadge() {
  return (
    <Badge variant="spicy" size="sm">
      Острое
    </Badge>
  );
}

export function VegetarianBadge() {
  return (
    <Badge variant="vegetarian" size="sm">
      Вегетарианское
    </Badge>
  );
}

// Count badge for cart icon
interface CountBadgeProps {
  count: number;
  className?: string;
}

export function CountBadge({ count, className = '' }: CountBadgeProps) {
  if (count <= 0) return null;

  return (
    <span
      className={`
        absolute -top-1 -right-1 min-w-[18px] h-[18px]
        flex items-center justify-center
        bg-primary text-white text-xs font-bold
        rounded-full px-1
        ${className}
      `}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}
