import React from 'react';
import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      containerStyle={{
        top: 16,
      }}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#3E2723',
          color: '#FFFFFF',
          padding: '12px 16px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: 500,
          maxWidth: '90vw',
        },
        success: {
          style: {
            background: '#4CAF50',
          },
          iconTheme: {
            primary: '#FFFFFF',
            secondary: '#4CAF50',
          },
        },
        error: {
          style: {
            background: '#F44336',
          },
          iconTheme: {
            primary: '#FFFFFF',
            secondary: '#F44336',
          },
        },
      }}
    />
  );
}
