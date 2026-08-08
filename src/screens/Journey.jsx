import React, { useEffect, useRef, useState } from 'react';
import { Unlock, Lock, X, Sparkles } from 'lucide-react';

// Import all Milestone Images
import imgDay1 from '../assets/Day1.png';
import imgDay5 from '../assets/Day5.png';
import imgDay8 from '../assets/Day8.png';
import imgDay10 from '../assets/Day10.png';
import imgDay15 from '../assets/Day15.png';
import imgDay17 from '../assets/Day17.png';
import imgDay20 from '../assets/Day20.png';
import imgDay25 from '../assets/Day25.png';
import imgDay30 from '../assets/Day30.png';
import bgJourney from '../assets/Designer (67).png';

// Carefully adjusted coordinates to match the true centers of the wooden platforms
const milestones = [
  {
    day: 30,
    image: imgDay30,
    y: 11,
    x: 50,
    size: 10,
    desc: "A magnificent magical tree blooming with all emotions in perfect harmony."
  },
  {
    day: 25,
    image: imgDay25,
    y: 22,
    x: 58,
    size: 10,
    desc: "Your garden is flourishing. New vibrant colors appear as you grow."
  },
  {
    day: 20,
    image: imgDay20,
    y: 30,
    x: 39,
    size: 10,
    desc: "The tree's roots grow deeper, bringing stability and peace."
  },
  {
    day: 17,
    image: imgDay17,
    y: 35,
    x: 63,
    size: 10,
    desc: "Beautiful new blossoms reflect your continued emotional awareness."
  },
  {
    day: 15,
    image: imgDay15,
    y: 44,
    x: 46,
    size: 10,
    desc: "Halfway through! The garden is becoming a safe haven."
  },
  {
    day: 10,
    image: imgDay10,
    y: 50,
    x: 64,
    size: 10,
    desc: "Small buds begin to open. Your consistency is paying off."
  },
  {
    day: 8,
    image: imgDay8,
    y: 61,
    x: 39,
    size: 10,
    desc: "First signs of growth. The soil is rich with potential."
  },
  {
    day: 5,
    image: imgDay5,
    y: 72,
    x: 62,
    size: 10,
    desc: "A small sprout appears, reaching for the sunlight."
  },
  {
    day: 1,
    image: imgDay1,
    y: 87,
    x: 37,
    size: 10,
    desc: "Your journey begins here. A single seed of hope is planted."
  },
];

const CURRENT_DAY = 30;

const Journey = () => {
  const scrollRef = useRef(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  // Scroll to bottom when opened
  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes floatOrganic {
            0% { transform: translate(-50%, -75%) translateY(0px); }
            50% { transform: translate(-50%, -75%) translateY(-6px); }
            100% { transform: translate(-50%, -75%) translateY(0px); }
          }
          
          @keyframes softGlow {
            0% { box-shadow: 0 0 15px 5px rgba(255, 220, 180, 0.5); }
            50% { box-shadow: 0 0 25px 8px rgba(255, 240, 220, 0.8); }
            100% { box-shadow: 0 0 15px 5px rgba(255, 220, 180, 0.5); }
          }

          @keyframes flutterAround {
            0% { transform: rotate(0deg) translateX(45px) rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) translateX(45px) rotate(-180deg) scale(1.2); }
            100% { transform: rotate(360deg) translateX(45px) rotate(-360deg) scale(1); }
          }
          
          @keyframes flutterAroundReverse {
            0% { transform: rotate(180deg) translateX(55px) rotate(-180deg) scale(1); }
            50% { transform: rotate(0deg) translateX(55px) rotate(0deg) scale(0.8); }
            100% { transform: rotate(-180deg) translateX(55px) rotate(180deg) scale(1); }
          }
          
          @keyframes twinkle {
            0% { transform: scale(0.8) rotate(0deg); opacity: 0.5; }
            50% { transform: scale(1.3) rotate(15deg); opacity: 1; filter: drop-shadow(0 0 5px rgba(255,255,255,0.8)); }
            100% { transform: scale(0.8) rotate(0deg); opacity: 0.5; }
          }
          
          /* Hide scrollbar for cleaner look */
          ::-webkit-scrollbar {
            width: 0px;
            height: 0px;
            background: transparent;
          }
        `}
      </style>

      {/* Fixed Full-Width Header Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: 'max(env(safe-area-inset-top, 24px), 24px) 24px 32px',
        background: 'linear-gradient(to bottom, #FDF3E7 40%, rgba(253, 243, 231, 0.9) 70%, rgba(253, 243, 231, 0) 100%)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          padding: '0px 8px',
          textShadow: '0 2px 10px rgba(255,255,255,0.9)'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#5C4E46', margin: 0, marginBottom: '2px' }}>
            My Journey
          </h1>
          <p style={{ fontSize: '12px', color: '#8C7B73', fontWeight: '600', margin: 0 }}>
            Every step helps your garden grow
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          width: '100%',
          height: '100vh', // Force viewport height
          overflowY: 'auto', // ONLY VERTICAL SCROLL
          overflowX: 'hidden', // NO HORIZONTAL SCROLL
          backgroundColor: '#FDF3E7',
          position: 'relative',
          fontFamily: "'Inter', sans-serif",
        }}
      >
      {/* 
        Scrollable Content Wrapper
      */}
      <div style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* SPACER AT THE TOP: Reduced from 140px to 80px */}
        <div style={{ height: '80px', width: '100%', flexShrink: 0 }}></div>

        {/* 
          Inner Scalable Image Canvas
          Explicit width & height ensures a perfect 2:3 ratio (733.33 x 1100).
          This prevents flexbox from squeezing it into the mobile width,
          allowing it to cleanly crop the left/right and only show the center!
        */}
        <div style={{
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '1100px',
          width: '733.33px', // Explicit width to prevent squeezing (1100 / 1.5)
          backgroundImage: `url("${bgJourney}")`,
          backgroundSize: '100% 100%',
          flexShrink: 0
        }}>

          {/* Gradient fade at the top */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '60px',
            background: 'linear-gradient(to bottom, #FDF3E7 0%, rgba(253, 243, 231, 0) 100%)',
            zIndex: 1,
            pointerEvents: 'none'
          }}></div>

          {/* Milestone Islands */}
          {/* Milestone Islands */}
          {milestones.map((ms, index) => {
            const isCurrent = ms.day === CURRENT_DAY;
            const isPast = ms.day < CURRENT_DAY;
            const isFuture = ms.day > CURRENT_DAY;

            return (
            <div
              key={ms.day}
              onClick={() => setSelectedMilestone(ms)}
              style={{
                position: 'absolute',
                top: `${ms.y}%`,
                left: `${ms.x}%`,
                zIndex: isCurrent ? 10 : 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: `${isCurrent ? ms.size * 1.25 : ms.size}%`,
                transform: 'translate(-50%, -75%)',
                animation: 'floatOrganic 4s ease-in-out infinite both',
                animationDelay: `${index * 0.3}s`,
                cursor: 'pointer',
                opacity: isPast ? 0.75 : (isFuture ? 0.9 : 1),
                filter: isFuture ? 'grayscale(0.6) blur(1px) sepia(0.3)' : 'none',
                transition: 'opacity 0.3s ease, filter 0.3s ease'
              }}
            >
              {/* Minimal Image anchored on Platform */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                border: isCurrent ? '3px solid #FFF' : '3px solid rgba(255,255,255,0.95)',
                marginBottom: '6px',
                backgroundColor: isFuture ? '#F5EBE1' : '#FFFDF9',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.2s ease',
                animation: isCurrent ? 'softGlow 3s ease-in-out infinite' : 'none',
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img
                  src={ms.image}
                  alt={`Day ${ms.day}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Glitters for Current Day */}
              {isCurrent && (
                <>
                  <div style={{
                    position: 'absolute',
                    top: '-15%',
                    right: '-15%',
                    animation: 'twinkle 2s ease-in-out infinite',
                    pointerEvents: 'none',
                    zIndex: 20
                  }}>
                    <Sparkles size={20} color="#FFFFFF" fill="#FFFFFF" strokeWidth={1} />
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '-20%',
                    animation: 'twinkle 3s ease-in-out infinite',
                    animationDelay: '0.7s',
                    pointerEvents: 'none',
                    zIndex: 20
                  }}>
                    <Sparkles size={16} color="#FFF0F5" fill="#FFF0F5" strokeWidth={1} />
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '35%',
                    right: '-30%',
                    animation: 'twinkle 2.5s ease-in-out infinite',
                    animationDelay: '1.4s',
                    pointerEvents: 'none',
                    zIndex: 20
                  }}>
                    <Sparkles size={18} color="#FFFFFF" fill="#FFFFFF" strokeWidth={1} />
                  </div>
                </>
              )}

              {/* Elegant Minimal Typography */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                backgroundColor: 'rgba(255,255,255,0.9)',
                padding: '4px 10px',
                borderRadius: '12px',
                backdropFilter: 'blur(4px)',
                boxShadow: isCurrent ? '0 4px 15px rgba(255, 220, 180, 0.6)' : '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                <h4 style={{
                  fontSize: '10px',
                  fontWeight: '900',
                  color: '#5C4E46',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Day {ms.day}
                </h4>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px'
                }}>
                  {isFuture ? (
                    <>
                      <Lock size={10} color="#A89F95" />
                      <span style={{ fontSize: '9px', color: '#A89F95', fontWeight: '800' }}>
                        Locked
                      </span>
                    </>
                  ) : (
                    <>
                      <Unlock size={10} color="#D97979" />
                      <span style={{ fontSize: '9px', color: '#D97979', fontWeight: '800' }}>
                        Unlocked
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            );
          })}

        </div>
      </div>

      {/* Modal Popup */}
      {selectedMilestone && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(253, 243, 231, 0.8)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(8px)',
          padding: '24px',
          animation: 'fadeIn 0.2s ease-out'
        }} onClick={() => setSelectedMilestone(null)}>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `}</style>

          <div style={{
            backgroundColor: '#FFFDF9',
            borderRadius: '32px',
            padding: '24px',
            width: '100%',
            maxWidth: '320px',
            boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
            position: 'relative',
            animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedMilestone(null)}
              style={{
                position: 'absolute',
                top: '16px', right: '16px',
                background: 'rgba(0,0,0,0.05)',
                border: 'none',
                borderRadius: '50%',
                width: '32px', height: '32px',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
            >
              <X size={18} color="#5C4E46" />
            </button>

            <img
              src={selectedMilestone.image}
              alt={`Day ${selectedMilestone.day}`}
              style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: '20px',
                objectFit: 'cover',
                marginBottom: '20px',
                border: '4px solid rgba(0,0,0,0.03)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
              }}
            />

            <h3 style={{
              margin: '0 0 8px 0',
              color: '#5C4E46',
              fontSize: '22px',
              fontWeight: '800'
            }}>Day {selectedMilestone.day}</h3>

            <p style={{
              margin: 0,
              color: '#8C7B73',
              fontSize: '15px',
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              {selectedMilestone.desc}
            </p>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Journey;
