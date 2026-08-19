import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Calendar, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import cameraImg from '../assets/camera_nobg.png';
import flowerImg from '../assets/flower_nobg.png';
import journalImg from '../assets/journal.jpg';
import heroImg from '../assets/summary_hero_bear.png';
import treasureBoxImg from '../assets/magical_treasure_box.png';
import polaroidBeach from '../assets/polaroid_beach.png';
import polaroidTea from '../assets/polaroid_tea.png';
import polaroidFlowers from '../assets/polaroid_flowers.png';
import imgHappy from '../assets/final_happy.png';
import imgCalm from '../assets/final_calm.png';
import imgLovely from '../assets/lovely_final_v3.png';
import imgSad from '../assets/final_sad.png';
import imgStress from '../assets/final_stress.png';
import imgGardenReflect from '../assets/a.png';
import imgMemory50 from '../assets/Designer (50).png';
import imgMemory51 from '../assets/Designer (51).png';
import imgWelcome from '../assets/Welcome.png';
import { fetchUserStats } from '../utils/api';
import { getGreeting } from '../utils/dateTime';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const moodConfig = [
  { id: 'happy', name: 'Happy', img: imgHappy, color: '#FFB088', bg: '#FFF3ED', border: '#FFE2D5' },
  { id: 'calm', name: 'Calm', img: imgCalm, color: '#8DC28B', bg: '#F0F7EF', border: '#D8EBD9' },
  { id: 'loved', name: 'Lovely', img: imgLovely, color: '#F4A6BA', bg: '#FFF0F4', border: '#FFD8E3' },
  { id: 'sad', name: 'Sad', img: imgSad, color: '#B6A6E4', bg: '#F5F2FC', border: '#E4DBF7' },
  { id: 'stress', name: 'Stress', img: imgStress, color: '#E09896', bg: '#FAF0F0', border: '#F5D7D6' },
];

const galleryMemories = [
  {
    id: 1,
    title: "Sunset Beach Walk",
    date: "July 15, 2026",
    mood: "Lovely",
    moodImg: imgLovely,
    image: polaroidBeach,
    note: "Sunset by the beach felt so peaceful and magical. Loved watching the soft waves."
  },
  {
    id: 2,
    title: "Quiet Morning Tea",
    date: "July 22, 2026",
    mood: "Calm",
    moodImg: imgCalm,
    image: polaroidTea,
    note: "A quiet morning with my favorite herbal tea. Took time to breathe deeply."
  },
  {
    id: 3,
    title: "Blooming Flowers",
    date: "July 28, 2026",
    mood: "Happy",
    moodImg: imgHappy,
    image: polaroidFlowers,
    note: "Fresh flowers always cheer me up! Planted new seeds in the garden today."
  },
  {
    id: 4,
    title: "Magical Garden Sunlight",
    date: "August 2, 2026",
    mood: "Happy",
    moodImg: imgHappy,
    image: imgMemory50,
    note: "Sunlight filtering through the trees made the whole garden glow."
  },
  {
    id: 5,
    title: "Cozy Garden Reading",
    date: "August 5, 2026",
    mood: "Calm",
    moodImg: imgCalm,
    image: imgMemory51,
    note: "Read a nice book under the shade of the big tree."
  },
  {
    id: 6,
    title: "Garden Reflection",
    date: "August 7, 2026",
    mood: "Lovely",
    moodImg: imgLovely,
    image: imgGardenReflect,
    note: "Grateful for another peaceful day taking care of myself and my garden."
  },
  {
    id: 7,
    title: "Welcome to Mood Garden",
    date: "July 1, 2026",
    mood: "Happy",
    moodImg: imgHappy,
    image: imgWelcome,
    note: "The day I started my emotional growth journey."
  }
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        backgroundColor: '#FFF',
        padding: '8px 14px',
        borderRadius: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        border: `1.5px solid ${data.border}`,
        fontSize: '13px',
        fontWeight: '700',
        color: '#5C4E46',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <img src={data.img} alt={data.name} style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
        <span>{data.name}:</span>
        <span style={{ color: data.color, fontWeight: '800' }}>{data.value} check-ins</span>
      </div>
    );
  }
  return null;
};

const Summary = () => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [moodData, setMoodData] = useState({ happy: 0, calm: 0, loved: 0, sad: 0, stress: 0 });
  const [isLoading, setIsLoading] = useState(false);
  
  // Gallery Modal states
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchUserStats(selectedMonth, selectedYear)
      .then(data => {
        if (data.success && data.moods) {
          setMoodData(data.moods);
        }
      })
      .catch(err => console.error("Failed to load summary stats:", err))
      .finally(() => setIsLoading(false));
  }, [selectedMonth, selectedYear]);

  const handleOpenBox = () => {
    setIsBoxOpen(true);
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const pieChartData = moodConfig.map(m => ({
    name: m.name,
    img: m.img,
    value: moodData[m.id] || 0,
    color: m.color,
    bg: m.bg,
    border: m.border
  })).filter(item => item.value > 0);

  const totalMoodsCount = Object.values(moodData).reduce((a, b) => a + b, 0);
  const dominantMood = [...pieChartData].sort((a, b) => b.value - a.value)[0];

  const filteredMemories = selectedFilter === 'All' 
    ? galleryMemories 
    : galleryMemories.filter(m => m.mood.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFF8F1', // Cream paper background
      padding: 'calc(env(safe-area-inset-top, 0px) + 16px) 24px 120px 24px',
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
        @keyframes modalScale {
          0% { transform: scale(0.92); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* HEADER SECTION */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', color: '#D97979', fontFamily: 'DM Serif Display, serif', marginBottom: '6px', lineHeight: '1.2' }}>
          Let's explore your data
        </h1>
        <p style={{ fontSize: '13px', color: '#9C8F87', lineHeight: '1.4', fontWeight: '600' }}>
          Here's a summary of your mood growth & memories. ✨
        </p>
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
            <img src={flowerImg} alt='flower' style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.2em', display: 'inline-block' }} /> Today at a Glance
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { icon: <img src={journalImg} alt='journal' style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: '4px' }} />, label: 'Journal Entry', count: 1 },
              { icon: <img src={cameraImg} alt='camera' style={{ width: '48px', height: '48px', objectFit: 'contain' }} />, label: 'Photos Added', count: 2 },
              { icon: <img src={imgLovely} alt='lovely' style={{ width: '48px', height: '48px', objectFit: 'contain' }} />, label: 'Lovely Moments', count: 5 },
              { icon: <img src={flowerImg} alt='flower' style={{ width: '42px', height: '42px', objectFit: 'contain' }} />, label: 'Days Streak', count: 30 }
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                  {stat.icon}
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#D97979' }}>{stat.count}</div>
                <div style={{ fontSize: '10px', color: '#9C8F87', fontWeight: '600', lineHeight: '1.2' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MONTHLY MOOD PIE CHART SUMMARY */}
        <div style={{
          backgroundColor: '#FFF',
          borderRadius: '28px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
          border: '1px solid rgba(255, 228, 232, 0.5)'
        }}>
          {/* Section Header & Month Navigator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '17px', color: '#5C4E46', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Monthly Mood Summary
              </h3>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                backgroundColor: '#FFF0F4',
                color: '#D97979',
                padding: '4px 12px',
                borderRadius: '16px',
                border: '1px solid #FFD9E2'
              }}>
                ✨ Mood Insights
              </span>
            </div>

            {/* Month & Year Selection Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FFF8F1',
              padding: '10px 16px',
              borderRadius: '22px',
              border: '1px solid #FFEBE0'
            }}>
              <button 
                onClick={handlePrevMonth}
                style={{
                  backgroundColor: '#FFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7A6B63',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={16} color="#D97979" />
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontFamily: 'DM Serif Display, serif',
                    fontSize: '17px',
                    fontWeight: '600',
                    color: '#5C4E46',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  {monthNames.map((m, idx) => (
                    <option key={idx} value={idx + 1}>{m}</option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#7A6B63',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  {[2025, 2026, 2027].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleNextMonth}
                style={{
                  backgroundColor: '#FFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7A6B63',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Pie Chart Visualization */}
          {isLoading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#9C8F87', fontSize: '13px' }}>
              Loading mood summary...
            </div>
          ) : totalMoodsCount === 0 ? (
            <div style={{
              padding: '36px 20px',
              textAlign: 'center',
              backgroundColor: '#FFF8F1',
              borderRadius: '20px',
              color: '#9C8F87',
              fontSize: '13px',
              lineHeight: '1.6',
              border: '1px dashed #FFE0D3'
            }}>
              <img src={flowerImg} alt="flower" style={{ width: '36px', height: '36px', marginBottom: '8px', opacity: 0.8 }} />
              <br/>
              No mood check-ins recorded for {monthNames[selectedMonth - 1]} {selectedYear}.<br/>
              Log your mood in the <b>Garden</b> tab to see your summary!
            </div>
          ) : (
            <>
              {/* Dominant Mood Highlight Banner */}
              {dominantMood && (
                <div style={{
                  backgroundColor: dominantMood.bg,
                  border: `1px solid ${dominantMood.border}`,
                  borderRadius: '20px',
                  padding: '14px 18px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
                }}>
                  <img src={dominantMood.img} alt={dominantMood.name} style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#5C4E46', marginBottom: '2px' }}>
                      Dominant Mood: <span style={{ color: dominantMood.color }}>{dominantMood.name}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#7A6B63', fontWeight: '600' }}>
                      {Math.round((dominantMood.value / totalMoodsCount) * 100)}% of check-ins this month ({dominantMood.value} times)
                    </div>
                  </div>
                </div>
              )}

              {/* Pie Chart Render */}
              <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={58}
                      outerRadius={86}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFF" strokeWidth={3} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>

                {/* Center Badge inside Donut */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#5C4E46', lineHeight: 1 }}>
                    {totalMoodsCount}
                  </div>
                  <div style={{ fontSize: '10px', color: '#9C8F87', fontWeight: '700', marginTop: '2px' }}>
                    Check-ins
                  </div>
                </div>
              </div>

              {/* Breakdown Grid with Actual Mood Images */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '20px' }}>
                {moodConfig.map((m) => {
                  const count = moodData[m.id] || 0;
                  const percentage = totalMoodsCount > 0 ? Math.round((count / totalMoodsCount) * 100) : 0;

                  return (
                    <div key={m.id} style={{
                      backgroundColor: m.bg,
                      borderRadius: '20px',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: `1px solid ${m.border}`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={m.img} alt={m.name} style={{ width: '34px', height: '34px', objectFit: 'contain' }} />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '800', color: '#5C4E46' }}>{m.name}</div>
                          <div style={{ fontSize: '11px', color: '#9C8F87', fontWeight: '600' }}>{percentage}%</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '800', color: m.color }}>
                        {count}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
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
            <img src={flowerImg} alt='flower' style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.2em', display: 'inline-block' }} /> Memory Treasure Box
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
            {/* Box Image with Soft Feathered Edges & No Hard Cut Border */}
            <div style={{
              position: 'relative',
              width: '190px',
              height: '190px',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '30px',
              filter: 'drop-shadow(0 8px 18px rgba(180, 140, 120, 0.12))'
            }}>
              <img 
                src={treasureBoxImg} 
                alt="Treasure Box" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  borderRadius: '30px',
                  WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 92%)',
                  maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 92%)'
                }} 
              />
            </div>

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
                  <div style={{ fontSize: '9px', fontWeight: '700', color: '#D97979', marginBottom: '4px' }}>Lovely</div>
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
                  <div style={{ fontSize: '9px', fontWeight: '700', color: '#88A3C5', marginBottom: '4px' }}>Calm</div>
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
                  <div style={{ fontSize: '9px', fontWeight: '700', color: '#8DC28B', marginBottom: '4px' }}>Happy</div>
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
              [*] Open My Box
            </button>
            <div 
              onClick={() => setShowGalleryModal(true)}
              style={{ fontSize: '13px', color: '#D97979', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              View all memories <ChevronRight size={16} />
            </div>
          </div>
        </div>

      </div>

      {/* ALL MEMORIES GALLERY MODAL */}
      {showGalleryModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(74, 64, 58, 0.45)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#FFF8F1',
            borderRadius: '28px',
            maxWidth: '430px',
            width: '100%',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
            border: '2px solid #FFE4E8',
            animation: 'modalScale 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              backgroundColor: '#FFF',
              borderBottom: '1px solid #FFEBE0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '20px', fontFamily: 'DM Serif Display, serif', color: '#5C4E46', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ImageIcon size={20} color="#D97979" /> Memory Gallery ({filteredMemories.length})
                </h3>
                <p style={{ fontSize: '12px', color: '#9C8F87', fontWeight: '600', marginTop: '2px' }}>
                  Relive all your recorded moments & photos
                </p>
              </div>
              <button
                onClick={() => setShowGalleryModal(false)}
                style={{
                  backgroundColor: '#FFF0F2',
                  color: '#D97979',
                  border: 'none',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Tabs */}
            <div style={{
              padding: '12px 20px',
              backgroundColor: '#FFF8F1',
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              borderBottom: '1px solid rgba(0,0,0,0.03)'
            }}>
              {['All', 'Happy', 'Calm', 'Lovely'].map((cat) => {
                const moodObj = moodConfig.find(m => m.name === cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    style={{
                      backgroundColor: selectedFilter === cat ? '#D97979' : '#FFF',
                      color: selectedFilter === cat ? '#FFF' : '#7A6B63',
                      border: '1px solid #FFE0D3',
                      padding: '6px 14px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: selectedFilter === cat ? '0 4px 10px rgba(217,121,121,0.2)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {moodObj && <img src={moodObj.img} alt={cat} style={{ width: '16px', height: '16px', objectFit: 'contain' }} />}
                    {cat === 'All' ? 'All Memories' : cat}
                  </button>
                );
              })}
            </div>

            {/* Scrollable Gallery Content */}
            <div style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px'
            }}>
              {filteredMemories.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setPreviewImage(item)}
                  style={{
                    backgroundColor: '#FFF',
                    borderRadius: '16px',
                    padding: '10px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                    border: '1px solid #FFEAE0',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '110px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '8px',
                    backgroundColor: '#FFF8F1'
                  }}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#9C8F87', fontWeight: '700' }}>{item.date}</span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: '800',
                      color: '#D97979',
                      backgroundColor: '#FFF0F2',
                      padding: '2px 6px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <img src={item.moodImg} alt={item.mood} style={{ width: '12px', height: '12px' }} /> {item.mood}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#5C4E46', marginBottom: '2px', lineHeight: '1.2' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '10px', color: '#7A6B63', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN PREVIEW LIGHTBOX */}
      {previewImage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(30, 25, 22, 0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300,
          padding: '24px'
        }}>
          <div style={{
            backgroundColor: '#FFF8F1',
            borderRadius: '24px',
            maxWidth: '360px',
            width: '100%',
            padding: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            textAlign: 'center',
            position: 'relative'
          }}>
            <button
              onClick={() => setPreviewImage(null)}
              style={{
                position: 'absolute',
                top: '-12px',
                right: '-12px',
                backgroundColor: '#FFF',
                color: '#5C4E46',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <img 
              src={previewImage.image} 
              alt={previewImage.title} 
              style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', borderRadius: '16px', marginBottom: '12px' }} 
            />

            <div style={{ fontSize: '11px', color: '#9C8F87', fontWeight: '700', marginBottom: '4px' }}>
              {previewImage.date} • {previewImage.mood}
            </div>
            <h4 style={{ fontSize: '18px', color: '#5C4E46', fontFamily: 'DM Serif Display, serif', marginBottom: '6px' }}>
              {previewImage.title}
            </h4>
            <p style={{ fontSize: '13px', color: '#7A6B63', lineHeight: '1.4', fontWeight: '600' }}>
              {previewImage.note}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
