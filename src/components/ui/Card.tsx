import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
  padding = 'md',
}: CardProps) {
  const isClickable = !!onClick;

  const cardContent = (
    <div
      className={`
        bg-white rounded-2xl shadow-card
        ${paddingStyles[padding]}
        ${hoverable || isClickable ? 'hover:shadow-card-hover transition-shadow duration-200' : ''}
        ${isClickable ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );

  if (isClickable) {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-3 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-lg font-semibold text-text ${className}`}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-border ${className}`}>
      {children}
    </div>
  );
}
