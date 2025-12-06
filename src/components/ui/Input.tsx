import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      icon,
      iconPosition = 'left',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 rounded-xl
              bg-white border transition-colors duration-200
              text-text placeholder:text-text-light
              focus:outline-none focus:ring-2
              ${error
                ? 'border-error focus:ring-error/20 focus:border-error'
                : 'border-border focus:ring-primary/20 focus:border-primary'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed bg-neutral' : ''}
              ${icon && iconPosition === 'left' ? 'pl-11' : ''}
              ${icon && iconPosition === 'right' ? 'pr-11' : ''}
              ${className}
            `}
            disabled={disabled}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-error flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-text-light">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-white border transition-colors duration-200
            text-text placeholder:text-text-light
            focus:outline-none focus:ring-2
            resize-none
            ${error
              ? 'border-error focus:ring-error/20 focus:border-error'
              : 'border-border focus:ring-primary/20 focus:border-primary'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed bg-neutral' : ''}
            ${className}
          `}
          disabled={disabled}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-error flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-text-light">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
