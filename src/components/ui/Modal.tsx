import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'full';
  position?: 'center' | 'bottom';
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  full: 'max-w-full mx-4',
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  size = 'md',
  position = 'center',
}: ModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const isBottomSheet = position === 'bottom';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            initial={
              isBottomSheet
                ? { y: '100%' }
                : { opacity: 0, scale: 0.95 }
            }
            animate={
              isBottomSheet
                ? { y: 0 }
                : { opacity: 1, scale: 1 }
            }
            exit={
              isBottomSheet
                ? { y: '100%' }
                : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.2 }}
            className={`
              relative z-10 w-full bg-white shadow-modal
              ${isBottomSheet
                ? 'rounded-t-2xl max-h-[85vh] overflow-y-auto'
                : `rounded-2xl ${sizeStyles[size]} mx-4 max-h-[85vh] overflow-y-auto`
              }
            `}
          >
            {/* Handle for bottom sheet */}
            {isBottomSheet && (
              <div className="sticky top-0 pt-3 pb-2 bg-white z-10">
                <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto" />
              </div>
            )}

            {/* Header */}
            {(title || showCloseButton) && (
              <div className="sticky top-0 flex items-center justify-between p-4 pb-2 bg-white z-10">
                {title && (
                  <h2 className="text-lg font-semibold text-text">{title}</h2>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 -mr-2 rounded-full hover:bg-neutral transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-text-light" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-4 pt-2">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Bottom sheet variant
export function BottomSheet(props: Omit<ModalProps, 'position'>) {
  return <Modal {...props} position="bottom" />;
}
