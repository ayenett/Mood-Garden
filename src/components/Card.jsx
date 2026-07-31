import React from 'react';

const Card = ({ children, style, className = '' }) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        ...style
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Card;
