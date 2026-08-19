import React from 'react';
import { Home, Book, Map, Sparkles, User } from 'lucide-react';
import { triggerLightHaptic } from '../utils/haptics';

const navItems = [
  { id: 'Garden', label: 'Garden', icon: Home },
  { id: 'Journal', label: 'Journal', icon: Book },
  { id: 'Journey', label: 'Journey', icon: Map },
  { id: 'Summary', label: 'Summary', icon: Sparkles },
  { id: 'Me', label: 'Me', icon: User },
];

const GlobalBottomNav = ({ activeTab, onNavigate }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 'calc(68px + env(safe-area-inset-bottom, 0px))',
      zIndex: 50,
      backgroundColor: '#FFF8F1', // identical cream tone to Journal page
      borderTop: '1px solid rgba(0, 0, 0, 0.04)', // subtle top divider
      padding: '0 12px',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      alignItems: 'center',
      pointerEvents: 'auto'
    }}>
      {navItems.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => {
              triggerLightHaptic();
              onNavigate && onNavigate(tab.id);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              outline: 'none',
              position: 'relative'
            }}
          >
            {/* Active Circle Background */}
            <div style={{
              position: 'absolute',
              width: '48px',
              height: '48px',
              borderRadius: '24px', // perfect circle
              backgroundColor: isActive ? '#FFE4E8' : 'transparent',
              transition: 'background-color 0.25s ease',
              zIndex: 0
            }} />
            
            {/* Icon and Label */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px', // smaller gap
              zIndex: 1,
              color: isActive ? '#D97979' : '#BBAFAB',
              transition: 'color 0.25s ease'
            }}>
              <IconComponent size={22} />
              <span style={{ fontSize: '11px', fontWeight: 500 }}>
                {tab.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default GlobalBottomNav;
