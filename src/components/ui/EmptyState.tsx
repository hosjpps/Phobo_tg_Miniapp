import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-neutral flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-text-light" />
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-text-light mb-6 max-w-xs">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
