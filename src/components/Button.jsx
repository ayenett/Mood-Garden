import React from 'react';

const Button = ({ children, onClick, style, className = '' }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: 'var(--mint-green)',
        color: 'var(--text-dark)',
        padding: '16px 32px',
        borderRadius: '30px',
        fontSize: '18px',
        fontWeight: '700',
        boxShadow: '0 8px 20px rgba(223, 245, 227, 0.6)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        ...style
      }}
      className={className}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(223, 245, 227, 0.8)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(223, 245, 227, 0.6)';
      }}
    >
      {children}
    </button>
  );
};

export default Button;
