// components/Toast.jsx
import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ type, message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />
  };

  const colors = {
    success: { bg: '#10B98115', border: '#10B981', text: '#10B981' },
    error: { bg: '#EF444415', border: '#EF4444', text: '#EF4444' },
    warning: { bg: '#F59E0B15', border: '#F59E0B', text: '#F59E0B' },
    info: { bg: '#3B82F615', border: '#3B82F6', text: '#3B82F6' }
  };

  return (
    <div 
      className="fixed top-4 right-4 z-50 max-w-sm w-full p-4 rounded-xl shadow-lg animate-slide-in-right"
      style={{
        backgroundColor: '#FFFFFF',
        border: `1px solid ${colors[type].border}`,
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
      }}
    >
      <div className="flex items-start gap-3">
        <span style={{ color: colors[type].text }}>
          {icons[type]}
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: '#3A3A3A' }}>
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg transition-all hover:scale-110"
          style={{ color: '#9CA3AF' }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// ToastContainer per gestire multiple notifiche
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};