import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { getGreeting } from '../utils/dateTime';

import heroImg from '../assets/summary_hero_bear.png';
import treasureBoxImg from '../assets/magical_treasure_box.png';
import polaroidBeach from '../assets/polaroid_beach.png';
import polaroidTea from '../assets/polaroid_tea.png';
import polaroidFlowers from '../assets/polaroid_flowers.png';
import treeImg from '../assets/Day30.png';

const Summary = () => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const handleOpenBox = () => {
    setIsBoxOpen(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFF8F1', // Cream paper background
      padding: '24px',
      paddingBottom: '120px', // Space for bottom nav
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Inline styles for animations */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(60px) scale(0.8) rotate(0deg); opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes gentleFloat1 {
          0%, 100% { transform: translateY(0px) rotate(-6deg); }
          50% { transform: translateY(-8px) rotate(-4deg); }
        }
        @keyframes gentleFloat2 {
          0%, 100% { transform: translateY(0px) rotate(4deg); }
          50% { transform: translateY(-6px) rotate(6deg); }
        }
        @keyframes gentleFloat3 {
          0%, 100% { transform: translateY(0px) rotate(8deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>

      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div style={{ zIndex: 10 }}>
          <h2 style={{ fontSize: '16px', color: '#7A6B63', fontWeight: '600', marginBottom: '4px' }}>{getGreeting()}</h2>
          <h1 style={{ fontSize: '32px', color: '#D97979', fontFamily: 'DM Serif Display, serif', marginBottom: '8px' }}>Ayenett 🌸</h1>
          <p style={{ fontSize: '13px', color: '#9C8F87', maxWidth: '200px', lineHeight: '1.4' }}>
            Here's your summary of growth and beautiful moments. 🌿✨
          </p>
        </div>
        
        {/* Coin Balance */}
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
          padding: '6px 12px', 
          borderRadius: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          zIndex: 10
        }}>
          <span style={{ fontSize: '14px' }}>🪙</span>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#5C4E46' }}>580</span>
        </div>

        {/* Hero Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: '-40px',
          width: '280px',
          height: '280px',
          opacity: 0.9,
          pointerEvents: 'none',
          zIndex: 1
        }}>
          <img src={heroImg} alt="Garden Hero" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* TODAY AT A GLANCE */}
        <div style={{ 
          backgroundColor: '#FFF', 
          borderRadius: '24px', 
          padding: '20px', 
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ fontSize: '15px', color: '#5C4E46', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🌸 Today at a Glance
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { icon: '📖', label: 'Journal Entry', count: 1 },
              { icon: '📷', label: 'Photos Added', count: 2 },
              { icon: '💖', label: 'Lovely Moments', count: 5 },
              { icon: '🌱', label: 'Days Streak', count: 18 }
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>{stat.icon}</div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#D97979' }}>{stat.count}</div>
                <div style={{ fontSize: '10px', color: '#9C8F87', fontWeight: '600', lineHeight: '1.2' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MEMORY TREASURE BOX */}
        <div style={{ 
          backgroundColor: '#FFF', 
          borderRadius: '24px', 
          padding: '24px', 
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h3 style={{ fontSize: '16px', color: '#5C4E46', fontWeight: '800', marginBottom: '4px' }}>
            🌸 Memory Treasure Box
          </h3>
          <p style={{ fontSize: '12px', color: '#9C8F87', marginBottom: '20px' }}>
            Open and relive beautiful moments from your journey.
          </p>

          <div style={{ 
            position: 'relative', 
            height: '240px', 
            display: 'flex', 
            alignItems: 'flex-end', 
            justifyContent: 'flex-start',
            perspective: '1000px'
          }}>
            {/* Box Image */}
            <img 
              src={treasureBoxImg} 
              alt="Treasure Box" 
              style={{ 
                width: '180px', 
                height: '180px', 
                objectFit: 'contain',
                position: 'relative',
                zIndex: 2,
                mixBlendMode: 'multiply'
              }} 
            />

            {/* Glowing Light */}
            {isBoxOpen && (
              <div style={{
                position: 'absolute',
                left: '40px',
                bottom: '80px',
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(255,228,150,0.8) 0%, rgba(255,228,150,0) 70%)',
                zIndex: 1,
                animation: 'glow 3s infinite ease-in-out'
              }} />
            )}

            {/* Floating Polaroids */}
            {isBoxOpen && (
              <div style={{ position: 'absolute', top: '-10px', right: '10px', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }}>
                
                {/* Polaroid 1 */}
                <div style={{
                  position: 'absolute', right: '40%', top: '10%',
                  width: '110px', backgroundColor: '#FFF', padding: '6px', paddingBottom: '16px',
                  borderRadius: '4px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  animation: 'floatUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, gentleFloat1 6s ease-in-out infinite 1.2s'
                }}>
                  <img src={polaroidBeach} style={{ width: '100%', borderRadius: '2px', marginBottom: '6px' }} />
                  <div style={{ fontSize: '8px', color: '#9C8F87', marginBottom: '2px' }}>July 15, 2026</div>
                  <div style={{ fontSize: '9px', fontWeight: '700', color: '#D97979', marginBottom: '4px' }}>🌸 Lovely</div>
                  <div style={{ fontSize: '9px', color: '#5C4E46', lineHeight: '1.2', fontFamily: 'Nunito, sans-serif' }}>Sunset by the beach felt so peaceful.</div>
                </div>

                {/* Polaroid 2 */}
                <div style={{
                  position: 'absolute', right: '0%', top: '30%',
                  width: '120px', backgroundColor: '#FFF', padding: '6px', paddingBottom: '16px',
                  borderRadius: '4px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  animation: 'floatUp 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, gentleFloat2 5s ease-in-out infinite 1.6s',
                  transform: 'rotate(4deg)'
                }}>
                  <img src={polaroidTea} style={{ width: '100%', borderRadius: '2px', marginBottom: '6px' }} />
                  <div style={{ fontSize: '8px', color: '#9C8F87', marginBottom: '2px' }}>July 22, 2026</div>
                  <div style={{ fontSize: '9px', fontWeight: '700', color: '#88A3C5', marginBottom: '4px' }}>☕ Calm</div>
                  <div style={{ fontSize: '9px', color: '#5C4E46', lineHeight: '1.2' }}>A quiet morning with my favorite tea.</div>
                </div>

                {/* Polaroid 3 */}
                <div style={{
                  position: 'absolute', right: '35%', top: '55%',
                  width: '100px', backgroundColor: '#FFF', padding: '6px', paddingBottom: '16px',
                  borderRadius: '4px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  animation: 'floatUp 2.0s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, gentleFloat3 7s ease-in-out infinite 2.0s',
                  transform: 'rotate(8deg)'
                }}>
                  <img src={polaroidFlowers} style={{ width: '100%', borderRadius: '2px', marginBottom: '6px' }} />
                  <div style={{ fontSize: '8px', color: '#9C8F87', marginBottom: '2px' }}>July 28, 2026</div>
                  <div style={{ fontSize: '9px', fontWeight: '700', color: '#8DC28B', marginBottom: '4px' }}>🌱 Happy</div>
                  <div style={{ fontSize: '9px', color: '#5C4E46', lineHeight: '1.2' }}>Flowers always cheer me up.</div>
                </div>

              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <button 
              onClick={handleOpenBox}
              style={{
                backgroundColor: '#FFE4E8',
                color: '#D97979',
                padding: '12px 24px',
                borderRadius: '24px',
                fontWeight: '800',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(217, 121, 121, 0.15)',
                cursor: 'pointer'
              }}
            >
              🎁 Open My Box
            </button>
            <div style={{ fontSize: '13px', color: '#D97979', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              View all memories <ChevronRight size={16} />
            </div>
          </div>
        </div>

        {/* LOWER SECTION GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          
          {/* THIS WEEK IN BLOOM */}
          <div style={{ 
            backgroundColor: '#FFF', 
            borderRadius: '24px', 
            padding: '20px', 
            boxShadow: '0 8px 24px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{ fontSize: '14px', color: '#5C4E46', fontWeight: '800', marginBottom: '16px' }}>🌸 This Week in Bloom</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '🌱', label: 'Check-ins', val: 4 },
                { icon: '📷', label: 'New Memories', val: 2 },
                { icon: '🏆', label: 'Milestones', val: 1 },
                { icon: '💖', label: 'Lovely Moments', val: 5 }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span style={{ fontSize: '15px', fontWeight: '800', color: '#5C4E46' }}>{item.val}</span>
                  <span style={{ fontSize: '12px', color: '#9C8F87', fontWeight: '600' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GARDEN PROGRESS */}
          <div style={{ 
            backgroundColor: '#FFF', 
            borderRadius: '24px', 
            padding: '20px', 
            boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h3 style={{ fontSize: '14px', color: '#5C4E46', fontWeight: '800', marginBottom: '12px' }}>🌸 Garden Progress</h3>
            <div style={{ fontSize: '11px', color: '#9C8F87', fontWeight: '600' }}>Current Streak</div>
            <div style={{ fontSize: '24px', color: '#D97979', fontFamily: 'DM Serif Display, serif' }}>18 days</div>
            
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#9C8F87', fontWeight: '600' }}>Next Reward</div>
            <div style={{ fontSize: '12px', color: '#5C4E46', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              🌸 Flower Bloom in 2 days
            </div>

            <div style={{ marginTop: '16px' }}>
              <div style={{ width: '100%', height: '6px', backgroundColor: '#F5EAE0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '80%', height: '100%', backgroundColor: '#FFD4E5', borderRadius: '3px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '10px', color: '#D97979', fontWeight: '700' }}>
                <span>Level 4 • Growing Strong</span>
                <ChevronRight size={12} />
              </div>
            </div>

            {/* Mini Tree */}
            <img src={treeImg} style={{ position: 'absolute', right: '-30px', top: '10px', width: '120px', height: '120px', objectFit: 'contain', opacity: 0.8, mixBlendMode: 'multiply' }} />
          </div>

        </div>

        {/* REFLECTION OF THE DAY */}
        <div style={{ 
          backgroundColor: '#FFF', 
          borderRadius: '24px', 
          padding: '24px', 
          boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
          backgroundImage: 'linear-gradient(180deg, transparent 27px, #F5EAE0 27px)',
          backgroundSize: '100% 28px',
          backgroundPosition: '0 14px',
          position: 'relative'
        }}>
          <h3 style={{ fontSize: '15px', color: '#5C4E46', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFF', display: 'inline-block', paddingRight: '12px' }}>
            🌸 Reflection of the Day
          </h3>
          <p style={{ 
            fontSize: '14px', 
            color: '#7A6B63', 
            fontFamily: 'DM Serif Display, serif',
            lineHeight: '28px',
            fontStyle: 'italic',
            marginBottom: '16px'
          }}>
            "Watched the morning sunlight filter through the leaves. It reminded me that small things can bring the biggest happiness."
          </p>
          <button style={{
            backgroundColor: '#FFF',
            color: '#D97979',
            padding: '8px 16px',
            borderRadius: '16px',
            fontWeight: '700',
            fontSize: '12px',
            border: '1px solid #FFE4E8',
            cursor: 'pointer'
          }}>
            📖 Read Full Entry
          </button>
        </div>

      </div>
    </div>
  );
};

export default Summary;
