import React, { useState, useEffect } from 'react';
import { 
  User, LogOut, Bell, Shield, Palette, HelpCircle, 
  ChevronRight, Award, Sparkles, Edit3, Heart, Check, 
  Volume2, Lock, Smartphone
} from 'lucide-react';
import profileImg from '../assets/profile1.jpg';
import flowerImg from '../assets/flower_nobg.png';

import { setClickSoundEnabled, getClickSoundEnabled } from '../utils/sound';
import { fetchUserStats } from '../utils/api';

const Me = ({ onNavigate, onLogout, isMuted = false, onToggleMusic }) => {
  const [stats, setStats] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [buttonSoundEnabled, setButtonSoundState] = useState(() => getClickSoundEnabled());
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState('Ayenett');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Sync sound active state with global audio
  const musicActive = onToggleMusic ? !isMuted : soundEnabled;

  const handleToggleClickSound = () => {
    const nextState = !buttonSoundEnabled;
    setButtonSoundState(nextState);
    setClickSoundEnabled(nextState);
  };

  useEffect(() => {
    fetchUserStats()
      .then((data) => {
        if (data.success && data.user) {
          setStats(data.user);
          setUserName(data.user.name || 'Ayenett');
        }
      })
      .catch((err) => console.error('Failed to load stats:', err));
  }, []);

  const handleSaveName = () => {
    setIsEditingName(false);
  };

  const handleConfirmLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFF8F1',
      padding: '24px',
      paddingBottom: '120px', // Space for bottom navigation
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '30px', 
          color: '#5C4E46', 
          fontFamily: 'DM Serif Display, serif', 
          marginBottom: '4px'
        }}>
          My Profile
        </h1>
        <p style={{ fontSize: '13px', color: '#9C8F87', fontWeight: '600' }}>
          Your personal garden space & settings
        </p>
      </div>

      {/* User Profile Card */}
      <div style={{
        backgroundColor: '#FFF',
        borderRadius: '28px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        border: '1px solid rgba(255, 228, 232, 0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Avatar Ring */}
          <div style={{
            position: 'relative',
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFD4E5 0%, #FFF1B8 100%)',
            padding: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 6px 16px rgba(217, 121, 121, 0.2)'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: '#FFF8F1',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <img 
                src={profileImg} 
                alt="Profile" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  borderRadius: '50%' 
                }} 
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: '#FFF',
              borderRadius: '50%',
              padding: '4px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src={flowerImg} alt="flower" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
            </div>
          </div>

          {/* User Info */}
          <div style={{ flex: 1 }}>
            {isEditingName ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="text" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    fontFamily: 'DM Serif Display, serif',
                    fontSize: '20px',
                    color: '#5C4E46',
                    border: '1px solid #D97979',
                    borderRadius: '8px',
                    padding: '2px 8px',
                    width: '120px'
                  }}
                  autoFocus
                />
                <button 
                  onClick={handleSaveName}
                  style={{
                    backgroundColor: '#D97979',
                    color: '#FFF',
                    borderRadius: '8px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}
                >
                  <Check size={14} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '24px', color: '#D97979', fontFamily: 'DM Serif Display, serif' }}>
                  {userName}
                </h2>
                <button 
                  onClick={() => setIsEditingName(true)}
                  style={{ color: '#B5A8A3', padding: '2px', cursor: 'pointer' }}
                >
                  <Edit3 size={15} />
                </button>
              </div>
            )}
            <p style={{ fontSize: '13px', color: '#7A6B63', fontWeight: '600', marginTop: '2px' }}>
              Blooming since July 2026 🌱
            </p>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div style={{
        backgroundColor: '#FFF',
        borderRadius: '24px',
        padding: '16px 20px',
        marginBottom: '24px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)'
      }}>
        <h3 style={{ fontSize: '14px', color: '#9C8F87', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Preferences
        </h3>

        {/* Row 1: Daily Reminder */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #FFF5F2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#FFE4E8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97979' }}>
              <Bell size={18} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#5C4E46' }}>Daily Check-in Reminder</div>
              <div style={{ fontSize: '12px', color: '#9C8F87', fontWeight: '600' }}>Every day at 8:00 PM</div>
            </div>
          </div>
          <button 
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            style={{
              width: '44px',
              height: '24px',
              borderRadius: '12px',
              backgroundColor: notificationsEnabled ? '#D97979' : '#E0D6D1',
              position: 'relative',
              transition: 'background-color 0.25s ease',
              padding: '2px'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#FFF',
              transform: notificationsEnabled ? 'translateX(20px)' : 'translateX(0px)',
              transition: 'transform 0.25s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
            }} />
          </button>
        </div>

        {/* Row 2: Sound & Ambient Effects */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #FFF5F2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#E5F2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A90E2' }}>
              <Volume2 size={18} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#5C4E46' }}>Gentle Lullaby Music</div>
              <div style={{ fontSize: '12px', color: '#9C8F87', fontWeight: '600' }}>Soft relaxing background music</div>
            </div>
          </div>
          <button 
            onClick={onToggleMusic ? onToggleMusic : () => setSoundEnabled(!soundEnabled)}
            style={{
              width: '44px',
              height: '24px',
              borderRadius: '12px',
              backgroundColor: musicActive ? '#4A90E2' : '#E0D6D1',
              position: 'relative',
              transition: 'background-color 0.25s ease',
              padding: '2px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#FFF',
              transform: musicActive ? 'translateX(20px)' : 'translateX(0px)',
              transition: 'transform 0.25s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
            }} />
          </button>
        </div>

        {/* Row 3: Button Sound Effects */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#FFEAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97979' }}>
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#5C4E46' }}>Button Sound Effects</div>
              <div style={{ fontSize: '12px', color: '#9C8F87', fontWeight: '600' }}>Balloon burst click sound</div>
            </div>
          </div>
          <button 
            onClick={handleToggleClickSound}
            style={{
              width: '44px',
              height: '24px',
              borderRadius: '12px',
              backgroundColor: buttonSoundEnabled ? '#D97979' : '#E0D6D1',
              position: 'relative',
              transition: 'background-color 0.25s ease',
              padding: '2px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#FFF',
              transform: buttonSoundEnabled ? 'translateX(20px)' : 'translateX(0px)',
              transition: 'transform 0.25s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
            }} />
          </button>
        </div>
      </div>

      {/* About & Community */}
      <div style={{
        backgroundColor: '#FFF',
        borderRadius: '24px',
        padding: '16px 20px',
        marginBottom: '32px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)'
      }}>
        <h3 style={{ fontSize: '14px', color: '#9C8F87', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          App Info
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Smartphone size={18} color="#7A6B63" />
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#5C4E46' }}>Mood Garden v1.2.0</span>
          </div>
          <span style={{ fontSize: '12px', color: '#B5A8A3', fontWeight: '600' }}>Up to date</span>
        </div>
      </div>

      {/* LOGOUT BUTTON AT THE VERY BOTTOM OF THE SCREEN */}
      <div style={{ marginTop: 'auto', paddingTop: '8px', paddingBottom: '16px' }}>
        <button
          onClick={() => setShowLogoutModal(true)}
          style={{
            width: '100%',
            backgroundColor: '#FFF0F2',
            color: '#D97979',
            border: '2px solid #FFD4E5',
            borderRadius: '20px',
            padding: '16px',
            fontSize: '15px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 4px 16px rgba(217, 121, 121, 0.12)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>

      {/* Confirmation Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(74, 64, 58, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '24px'
        }}>
          <div style={{
            backgroundColor: '#FFF8F1',
            borderRadius: '28px',
            padding: '28px 24px',
            maxWidth: '320px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            border: '2px solid #FFE4E8',
            animation: 'floatUp 0.3s ease-out'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#FFE4E8',
              color: '#D97979',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <LogOut size={26} />
            </div>
            <h3 style={{ fontSize: '20px', fontFamily: 'DM Serif Display, serif', color: '#5C4E46', marginBottom: '8px' }}>
              Log Out?
            </h3>
            <p style={{ fontSize: '13px', color: '#7A6B63', fontWeight: '600', marginBottom: '24px', lineHeight: '1.4' }}>
              Are you sure you want to log out of your garden? Your progress will be saved.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  flex: 1,
                  backgroundColor: '#EFE4DC',
                  color: '#5C4E46',
                  borderRadius: '16px',
                  padding: '12px',
                  fontWeight: '700',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                style={{
                  flex: 1,
                  backgroundColor: '#D97979',
                  color: '#FFF',
                  borderRadius: '16px',
                  padding: '12px',
                  fontWeight: '700',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(217, 121, 121, 0.3)'
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Me;
