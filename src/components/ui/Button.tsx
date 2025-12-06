import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700',
  secondary: 'bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700',
  outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20',
  ghost: 'text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20',
  danger: 'bg-error text-white hover:bg-red-600 active:bg-red-700',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-base rounded-xl',
  lg: 'px-6 py-3.5 text-lg rounded-xl',
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium transition-colors duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={isDisabled}
      {...(props as any)}
    >
      {loading ? (
        <Loader2 className={`${iconSizeStyles[size]} animate-spin`} />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className={iconSizeStyles[size]}>{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className={iconSizeStyles[size]}>{icon}</span>
          )}
        </>
      )}
    </motion.button>
  );
}
