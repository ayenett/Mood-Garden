import flowerImg from '../assets/flower_nobg.png';
import React, { useState, useEffect } from 'react';
import bgDay1 from '../assets/Day1.png';
import bgDay3 from '../assets/Day3.png';
import bgDay5 from '../assets/Day5.png';
import bgDay8 from '../assets/Day8.png';
import bgDay10 from '../assets/Day10.png';
import bgDay15 from '../assets/Day15.png';
import bgDay17 from '../assets/Day17.png';
import bgDay20 from '../assets/Day20.png';
import bgDay25 from '../assets/Day25.png';
import bgDay30 from '../assets/Day30.png';
import imgHappy from '../assets/final_happy.png';
import imgCalm from '../assets/final_calm.png';
import imgLovely from '../assets/lovely_final_v3.png';
import imgSad from '../assets/final_sad.png';
import imgStress from '../assets/final_stress.png';
import imgReflection from '../assets/a.png';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Home, Book, Map, Compass, User, Edit3, ChevronRight, Check, Smile, Sun, CloudRain, Zap, Heart, Star, Flame } from 'lucide-react';
import { getGreeting } from '../utils/dateTime';

const Garden = ({ onNavigate }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [stats, setStats] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const currentStreak = stats ? stats.user.streak : 30;

  const getBgImage = (streak) => {
    if (streak >= 30) return bgDay30;
    if (streak >= 25) return bgDay25;
    if (streak >= 20) return bgDay20;
    if (streak >= 17) return bgDay17;
    if (streak >= 15) return bgDay15;
    if (streak >= 10) return bgDay10;
    if (streak >= 8) return bgDay8;
    if (streak >= 5) return bgDay5;
    if (streak >= 3) return bgDay3;
    return bgDay1;
  };

  const isTreeStage = currentStreak >= 10;
  const bgImage = getBgImage(currentStreak);

  // Dynamic badge positions for early growth vs Tree stage
  const positions = isTreeStage ? {
    happy: { top: '14%', left: '28%' },
    calm: { top: '28%', left: '10%' },
    loved: { top: '27%', left: '75%' },
    sad: { top: '65%', left: '16%' },
    stress: { top: '62%', left: '76%' }
  } : {
    happy: { top: '18%', left: '3%' },
    calm: { top: '18%', left: '22%' },
    loved: { top: '18%', left: '41%' },
    sad: { top: '18%', left: '60%' },
    stress: { top: '18%', left: '79%' }
  };

  // Fetch stats on load or month change
  useEffect(() => {
    fetch(`http://localhost:4000/api/stats?month=${selectedMonth}&year=${selectedYear}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data);
          if (data.todayMood) {
            setSelectedMood(data.todayMood);
          }
        }
      })
      .catch(err => console.error("Failed to load stats:", err));
  }, [selectedMonth, selectedYear]);

  // Submit or change today's mood on backend (1 check-in per day logic)
  const handleMoodSelect = async (moodId) => {
    if (isUpdating) return;
    setIsUpdating(true);
    setSelectedMood(moodId);
    
    try {
      const res = await fetch(`http://localhost:4000/api/mood?month=${selectedMonth}&year=${selectedYear}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: moodId })
      });
      const data = await res.json();
      if (data.success) {
        setStats(data);
        if (data.todayMood) {
          setSelectedMood(data.todayMood);
        }
      }
    } catch (err) {
      console.error("Failed to save mood:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Reusable Fruit Component for the Tree
  const MoodFruit = ({ emoji, label, count, top, left, color, delay }) => (
    <div style={{
      position: 'absolute',
      top, left,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animation: `float 6s ease-in-out infinite ${delay}s`
    }}>

      <div style={{
        background: color, // Use the fruit's theme color
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: '800',
        color: '#5C4E46', // Darker text for readability
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '2px solid rgba(255,255,255,0.7)', // Soft white border
        zIndex: 1,
        lineHeight: 1.2,
        backdropFilter: 'blur(4px)'
      }}>
        {label}<br/>{count}
      </div>
    </div>
  );

  return (
    <div style={{
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      position: 'relative',
      backgroundColor: '#FFF8F1', // Warm cream background
      overflowY: 'auto',
      overflowX: 'hidden',
      scrollBehavior: 'smooth'
    }}>
      
      {/* 1. Hero Section (The Tree) */}
      <div style={{
        position: 'relative',
        height: '85vh',
        minHeight: '650px',
        backgroundImage: `url("${bgImage}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundSize: 'contain',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Top Header */}
        <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 10 }}>
          <div>
            <div style={{ fontSize: '15px', color: '#7A6B63', fontWeight: '600' }}>{getGreeting()}</div>
            <div style={{ fontSize: '28px', color: '#D97979', fontFamily: 'DM Serif Display, serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {stats ? stats.user.name : 'Ayenett'}
            </div>
          </div>
          
          <div style={{ 
            background: 'rgba(255,255,255,0.85)', 
            padding: '8px 16px', 
            borderRadius: '30px', 
            fontWeight: '800', 
            color: '#5C4E46',
            fontSize: '14px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <img src={flowerImg} alt='flower' style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.2em', display: 'inline-block' }} /> {stats ? stats.user.streak : '...'}
          </div>
        </div>

        {/* Floating Mood Fruits (Linked to Database) */}
        <MoodFruit emoji="😊" label="Happy" count={stats ? stats.moods.happy : 0} top={positions.happy.top} left={positions.happy.left} color="#FFDCC8" delay={0} />
        <MoodFruit emoji="😌" label="Calm" count={stats ? stats.moods.calm : 0} top={positions.calm.top} left={positions.calm.left} color="#C7DFC7" delay={1} />
        <MoodFruit emoji="🥰" label="Loved" count={stats ? stats.moods.loved : 0} top={positions.loved.top} left={positions.loved.left} color="#F7CAD0" delay={0.5} />
        <MoodFruit emoji="😢" label="Sad" count={stats ? stats.moods.sad : 0} top={positions.sad.top} left={positions.sad.left} color="#DCCCF6" delay={1.5} />
        <MoodFruit emoji="😫" label="Stress" count={stats ? stats.moods.stress : 0} top={positions.stress.top} left={positions.stress.left} color="#E9B5B3" delay={0.2} />

        {/* Peaceful Garden Pill overlapping bottom */}
        <div style={{ 
          position: 'absolute',
          bottom: '40px',
          left: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          padding: '16px 20px',
          borderRadius: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 15
        }}>
          <div>
            <div style={{ fontWeight: '700', color: '#5B6955', fontSize: '14px', marginBottom: '4px' }}>
              🌿 Your garden feels peaceful today.
            </div>
            <div style={{ color: '#7A6B63', fontSize: '13px', fontWeight: '600' }}>
              Thank you for taking care of yourself.
            </div>
          </div>
          <div style={{ color: '#F7CAD0' }}>
            <Heart size={20} fill="#F7CAD0" color="#F7CAD0" />
          </div>
        </div>
      </div>

      {/* 2. Bottom Sheet Content Area */}
      <div style={{ 
        flex: 1,
        backgroundColor: '#FFF8F1', 
        borderTopLeftRadius: '32px',
        borderTopRightRadius: '32px',
        marginTop: '-32px',
        padding: '32px 24px 100px',
        zIndex: 20,
        position: 'relative',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.05)'
      }}>
        
        {/* Mood Check-in */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#5C4E46', marginBottom: '4px' }}>How are you feeling now?</h2>
          <p style={{ fontSize: '14px', color: '#9C8F87', fontWeight: '600', marginBottom: '20px' }}>Tap a flower to check in</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
          
            {[
              { id: 'happy', label: 'Happy', img: imgHappy },
              { id: 'calm', label: 'Calm', img: imgCalm },
              { id: 'loved', label: 'Lovely', img: imgLovely },
              { id: 'sad', label: 'Sad', img: imgSad },
              { id: 'stress', label: 'Stress', img: imgStress },
            ].map(m => (
              <button 
                key={m.id}
                onClick={() => handleMoodSelect(m.id)}
                disabled={isUpdating}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '8px',
                  opacity: selectedMood && selectedMood !== m.id ? 0.5 : 1,
                  transition: '0.3s ease',
                  transform: selectedMood === m.id ? 'scale(1.1)' : 'scale(1)',
                  background: 'transparent',
                  border: 'none',
                  padding: 0
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img 
                    src={m.img} 
                    alt={m.label} 
                    style={{ 
                      width: '68px', height: '68px', 
                      objectFit: 'contain'
                    }}
                  />
                  {selectedMood === m.id && (
                    <div style={{ position: 'absolute', top: -4, right: -4, background: '#FFF', borderRadius: '50%', padding: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10 }}>
                      <Check size={14} color="#5C4E46" strokeWidth={4} />
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#7A6B63' }}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Reflection Card */}
        <div style={{ 
          backgroundColor: '#FFF',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <img 
            src={imgReflection} 
            alt="Decoration"
            style={{ 
              position: 'absolute', 
              right: '-10px', 
              bottom: '-20px', 
              width: '140px', 
              height: '140px', 
              objectFit: 'contain', 
              WebkitMaskImage: 'radial-gradient(circle at 100% 100%, black 70%, transparent 100%)',
              maskImage: 'radial-gradient(circle at 100% 100%, black 70%, transparent 100%)',
              zIndex: 0 
            }} 
          />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#5C4E46', marginBottom: '8px' }}>Today's Reflection</h3>
            <p style={{ fontSize: '14px', color: '#7A6B63', fontWeight: '600', marginBottom: '20px' }}>What made you smile today?</p>
            
            <button 
              onClick={() => onNavigate && onNavigate('Journal')}
              style={{ 
                backgroundColor: '#FFE4E8', 
                color: '#D97979', 
                border: 'none',
                padding: '12px 20px',
                borderRadius: '16px',
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(217, 121, 121, 0.15)',
                cursor: 'pointer'
              }}
            >
              <Edit3 size={16} /> Write in Journal
            </button>
          </div>
        </div>

        {/* Your Journey Card (Linked to Database) */}
        <div 
          onClick={() => onNavigate && onNavigate('Journey')}
          style={{ 
          backgroundColor: '#FFF',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#5C4E46', marginBottom: '4px' }}>Your Journey</h3>
            <p style={{ fontSize: '13px', color: '#9C8F87', fontWeight: '600', marginBottom: '12px' }}>
              You've planted {stats ? stats.user.total_flowers : '--'} flowers this month
            </p>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(7)].map((_, i) => (
                <Star key={i} size={16} color="#D97979" fill={i < 5 ? "#D97979" : "none"} />
              ))}
            </div>
          </div>
          <button style={{ 
            width: '40px', height: '40px', 
            borderRadius: '50%', 
            backgroundColor: '#FFF0F2', 
            color: '#D97979',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            border: 'none'
          }}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Garden;
