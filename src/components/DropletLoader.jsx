// components/DropletLoader.jsx
import React from 'react';
import { Droplet } from 'lucide-react';


export function DropletLoader({ size = 15, color = '#8CA386', className = '' }) {
  return (
    <span className={`flex gap-1.5 items-center ${className}`}>
      {([0, 0.3, 0.6] ).map((delay, i) => (
        <Droplet
          key={i}
          size={size}
          color={color}
          style={{ 
            animation: 'dropletFall 0.9s ease-in infinite', 
            animationDelay: `${delay}s` 
          }}
        />
      ))}
    </span>
  );
}



export function PageLoader({ label, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 gap-4 animate-fadeInUp ${className}`}>
      <DropletLoader size={18} color="#8CA386" />
      {label && <p className="text-sm" style={{ color: '#718096' }}>{label}</p>}
    </div>
  );
}



export function FullscreenLoader({ label }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center animate-fadeInBlur"
      style={{ background: '#f7f9f7' }}
    >
      <div className="flex flex-col items-center gap-4">
        <DropletLoader size={22} color="#8CA386" />
        {label && <p className="text-sm" style={{ color: '#4A5568' }}>{label}</p>}
      </div>
    </div>
  );
}