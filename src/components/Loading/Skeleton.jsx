// components/Loading/Skeleton.jsx
import React from 'react';

export const Skeleton = ({ className = '', variant = 'text', width = '100%', height = '20px', rounded = '8px' }) => {
  const baseStyles = {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'skeleton-loading 1.5s ease-in-out infinite',
    borderRadius: rounded,
    width: width,
    height: height,
    display: 'block'
  };

  return <div style={baseStyles} className={className} />;
};

// Skeleton Card
export const SkeletonCard = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl p-4" style={{ backgroundColor: '#F7F7F7', border: '1px solid #E5E7EB' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Skeleton variant="circle" width="40px" height="40px" rounded="50%" />
              <div>
                <Skeleton width="150px" height="18px" />
                <Skeleton width="100px" height="14px" className="mt-1" />
              </div>
            </div>
            <Skeleton width="80px" height="24px" rounded="20px" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton width="60px" height="14px" />
              <Skeleton width="80px" height="14px" />
            </div>
            <Skeleton width="100%" height="60px" />
          </div>
        </div>
      ))}
    </>
  );
};

// Skeleton Table
export const SkeletonTable = ({ rows = 5, columns = 5 }) => {
  return (
    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#F7F7F7', border: '1px solid #E5E7EB' }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="py-3 px-4">
                  <Skeleton width="80%" height="14px" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                {Array.from({ length: columns }).map((_, j) => (
                  <td key={j} className="py-3 px-4">
                    <Skeleton width={j === 0 ? '60%' : '80%'} height="16px" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Skeleton Chart
export const SkeletonChart = ({ height = '200px' }) => {
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: '#F7F7F7', border: '1px solid #E5E7EB' }}>
      <Skeleton width="150px" height="16px" className="mb-3" />
      <div style={{ height, position: 'relative' }}>
        <Skeleton width="100%" height="100%" />
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          display: 'flex', 
          gap: '4px',
          padding: '0 10px'
        }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton 
              key={i} 
              width="100%" 
              height={`${20 + Math.random() * 60}%`} 
              rounded="4px"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Skeleton KPIs
export const SkeletonKPI = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl p-4" style={{ backgroundColor: '#F7F7F7', border: '1px solid #E5E7EB' }}>
          <div className="flex items-start justify-between">
            <Skeleton variant="circle" width="40px" height="40px" rounded="12px" />
            <Skeleton width="30px" height="16px" />
          </div>
          <Skeleton width="60px" height="28px" className="mt-2" />
          <Skeleton width="80px" height="14px" className="mt-1" />
        </div>
      ))}
    </div>
  );
};

// CSS per skeleton
const skeletonStyles = `
  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

// Inserisci lo style in un componente o nell'index.html
export const SkeletonStyles = () => (
  <style>{skeletonStyles}</style>
);