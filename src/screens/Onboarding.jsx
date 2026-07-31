import React, { useMemo } from 'react';
import Button from '../components/Button';
import bgImage from '../assets/Welcome.png';

const Onboarding = ({ onComplete }) => {
  // Generate random glitters only once per mount
  const glitters = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`, // 2px to 6px
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 3 + 2}s` // 2s to 5s
    }));
  }, []);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      background: `url("${bgImage}") no-repeat center center`,
      backgroundSize: 'cover',
      overflow: 'hidden'
    }}>
      
      {/* Glitter Animations */}
      {glitters.map(glitter => (
        <div 
          key={glitter.id}
          style={{
            position: 'absolute',
            top: glitter.top,
            left: glitter.left,
            width: glitter.size,
            height: glitter.size,
            backgroundColor: '#FFF',
            borderRadius: '50%',
            boxShadow: '0 0 10px 3px rgba(255, 255, 255, 0.8)',
            animation: `sparkle ${glitter.duration} ease-in-out infinite ${glitter.delay}`,
            opacity: 0,
            pointerEvents: 'none' // Ensures they don't block clicks
          }}
        />
      ))}

      {/* Top Content Area - Removed as requested */}
      <div style={{ flex: 1, zIndex: 10 }}></div>

      {/* Bottom Content Area - CTA Only */}
      <div style={{ 
        padding: '0 24px 60px', 
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Button 
          onClick={onComplete} 
          style={{ 
            width: '100%', 
            maxWidth: '220px', // Reduced width
            backgroundColor: 'rgba(255, 255, 255, 0.35)', 
            color: '#4A403A',
            padding: '14px 20px', // Reduced padding
            fontSize: '15px',     // Reduced font size
            fontWeight: '800',
            borderRadius: '100px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
          }}
        >
          Plant Your First Seed
        </Button>
      </div>
      
    </div>
  );
};

export default Onboarding;
