// components/Tooltip/Tooltip.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Info, HelpCircle } from 'lucide-react';

export const Tooltip = ({ 
  children, 
  content, 
  position = 'top', 
  variant = 'info',
  className = '',
  delay = 300
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const tooltipWidth = tooltipRef.current?.offsetWidth || 200;
        const tooltipHeight = tooltipRef.current?.offsetHeight || 50;
        
        let top = 0;
        let left = 0;
        
        switch(position) {
          case 'top':
            top = rect.top - tooltipHeight - 8;
            left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
            break;
          case 'bottom':
            top = rect.bottom + 8;
            left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
            break;
          case 'left':
            top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
            left = rect.left - tooltipWidth - 8;
            break;
          case 'right':
            top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
            left = rect.right + 8;
            break;
          default:
            top = rect.top - tooltipHeight - 8;
            left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
        }
        
        setCoords({ top, left });
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const variants = {
    info: { bg: '#3B82F6', text: '#FFFFFF' },
    success: { bg: '#10B981', text: '#FFFFFF' },
    warning: { bg: '#F59E0B', text: '#FFFFFF' },
    error: { bg: '#EF4444', text: '#FFFFFF' },
    dark: { bg: '#1F2937', text: '#FFFFFF' }
  };

  const variantColors = variants[variant] || variants.info;

  return (
    <div 
      ref={triggerRef}
      className={`inline-block relative ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-[9999] px-3 py-2 text-xs font-medium rounded-lg shadow-lg max-w-xs pointer-events-none"
          style={{
            top: coords.top,
            left: coords.left,
            backgroundColor: variantColors.bg,
            color: variantColors.text,
            animation: 'fadeInTooltip 0.15s ease-out',
            transform: 'translateY(0)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}
        >
          {content}
          <div 
            className="absolute w-2 h-2 rotate-45"
            style={{
              backgroundColor: variantColors.bg,
              ...(position === 'top' && { bottom: '-4px', left: '50%', marginLeft: '-4px' }),
              ...(position === 'bottom' && { top: '-4px', left: '50%', marginLeft: '-4px' }),
              ...(position === 'left' && { right: '-4px', top: '50%', marginTop: '-4px' }),
              ...(position === 'right' && { left: '-4px', top: '50%', marginTop: '-4px' })
            }}
          />
        </div>
      )}
      <style>{`
        @keyframes fadeInTooltip {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

// Tooltip con icona
export const InfoTooltip = ({ content, icon = <Info size={16} />, className = '', ...props }) => {
  return (
    <Tooltip content={content} className={className} {...props}>
      <span className="inline-flex items-center justify-center cursor-help text-gray-400 hover:text-[#8CA386] transition-colors">
        {icon}
      </span>
    </Tooltip>
  );
};

// Tooltip per badge stato
export const StatusTooltip = ({ status, children }) => {
  const statusInfo = {
    configurazione: {
      label: 'Configurazione',
      description: 'La struttura è in fase di configurazione iniziale',
      color: '#6B7280'
    },
    simulazione: {
      label: 'Simulazione',
      description: 'Il sistema sta simulando i consumi e addestrando l\'AI',
      color: '#3B82F6'
    },
    'dry-run': {
      label: 'Dry-run',
      description: 'Il sistema è in osservazione, pronto per il controllo attivo',
      color: '#F59E0B'
    },
    live: {
      label: 'Live',
      description: 'Il sistema è attivo e controlla automaticamente la struttura',
      color: '#10B981'
    }
  };

  const info = statusInfo[status] || statusInfo.configurazione;

  return (
    <Tooltip content={info.description} variant="dark">
      {children}
    </Tooltip>
  );
};