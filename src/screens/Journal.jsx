import cameraImg from '../assets/camera_nobg.png';
import voiceImg from '../assets/voice.png';
import flowerImg from '../assets/flower_nobg.png';
import React, { useState, useRef } from 'react';
import imgNotebook from '../assets/Designer (51).png';
import imgHappy from '../assets/final_happy.png';
import imgCalm from '../assets/final_calm.png';
import imgLovely from '../assets/lovely_final_v3.png';
import imgSad from '../assets/final_sad.png';
import imgStress from '../assets/final_stress.png';
import { getGreeting, getFormattedCurrentDate, getPast7DaysCarousel } from '../utils/dateTime';
import { 
  Home, Book, Map, Compass, User, ChevronRight, ChevronLeft, 
  X, Calendar, Heart, Image as ImageIcon, Mic, Sun, Cloud, Sparkles, Plus, Edit3, 
  Play, Square, Check, Trash2, Camera
} from 'lucide-react';

// Initial Mock Entries for July 2026
const INITIAL_ENTRIES = {
  '2026-07-24': {
    dateKey: '2026-07-24',
    dateStr: 'Jul 24',
    fullDate: 'July 24, 2026',
    dayName: 'Friday',
    prompt: 'What brought you peace today?',
    content: 'Walked through the garden in the afternoon. The air was cool and smelled of fresh rain. I sat by the small pond and listened to the birds sing peacefully.',
    mood: 'Calm',
    moodImg: imgCalm,
    photoUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80',
    gratitude: 'Warm tea by the window (~_~)',
    voiceNoteDuration: '0:18'
  },
  '2026-07-26': {
    dateKey: '2026-07-26',
    dateStr: 'Jul 26',
    fullDate: 'July 26, 2026',
    dayName: 'Sunday',
    prompt: 'Who made your heart warm today?',
    content: 'Had sweet afternoon tea with friends. We laughed so much talking about old childhood memories. Feeling so blessed and loved today.',
    mood: 'Lovely',
    moodImg: imgLovely,
    photoUrl: null,
    gratitude: 'Good laughter with old friends (♥_♥)',
    voiceNoteDuration: null
  },
  '2026-07-28': {
    dateKey: '2026-07-28',
    dateStr: 'Jul 28',
    fullDate: 'July 28, 2026',
    dayName: 'Tuesday',
    prompt: 'What small victory did you celebrate?',
    content: 'Finished my watercolor painting of the pink blossoms! It took 3 days but seeing it complete on my desk makes me so happy and proud.',
    mood: 'Happy',
    moodImg: imgHappy,
    photoUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80',
    gratitude: 'Completing my blossom painting (^∇^)',
    voiceNoteDuration: '0:25'
  },
  '2026-07-30': {
    dateKey: '2026-07-30',
    dateStr: 'Jul 30',
    fullDate: 'July 30, 2026',
    dayName: 'Thursday',
    prompt: 'What made you smile today?',
    content: 'Watched the morning sunlight filter through the leaves in my garden. Taking a deep breath and enjoying a warm cup of floral tea.',
    mood: 'Lovely',
    moodImg: imgLovely,
    photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    gratitude: 'Morning sunlight & floral tea ',
    voiceNoteDuration: '0:12'
  }
};

const PRESET_PHOTOS = [
  { label: 'Blossom Garden', url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80' },
  { label: 'Morning Tea', url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80' },
  { label: 'Cozy Reading Desk', url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80' },
  { label: 'Golden Sunset', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' }
];

const AFFIRMATIONS = [
  "You are doing better than you think.",
  "Every small step brings beauty to your garden.",
  "Be gentle with your heart today.",
  "You deserve rest, peace, and happiness."
];

const Journal = ({ onNavigate }) => {
  const currentDateInfo = getFormattedCurrentDate();
  const CarouselDates = getPast7DaysCarousel();
  
  // Saved Toast State
  const [isSavedToast, setIsSavedToast] = useState(false);

  // Entries State initialized safely from localStorage or fallback to INITIAL_ENTRIES
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('mood_garden_journal_entries');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && Object.keys(parsed).length > 0) {
          const cleanEntries = {};
          Object.keys(parsed).forEach(k => {
            if (parsed[k] && typeof parsed[k] === 'object') {
              cleanEntries[k] = parsed[k];
            }
          });
          return {
            ...INITIAL_ENTRIES,
            ...cleanEntries
          };
        }
      }
    } catch (e) {
      console.error("Failed to load saved journal entries:", e);
    }
    return {
      ...INITIAL_ENTRIES,
      [currentDateInfo.dateKey]: INITIAL_ENTRIES[currentDateInfo.dateKey] || {
        dateKey: currentDateInfo.dateKey,
        dateStr: currentDateInfo.shortDate,
        fullDate: currentDateInfo.fullDate,
        dayName: currentDateInfo.dayName,
        prompt: 'What made you smile today?',
        content: 'Watched the morning sunlight filter through the leaves in my garden. Taking a deep breath and enjoying a warm cup of floral tea.',
        mood: 'Lovely',
        photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
        gratitude: 'Morning sunlight & floral tea ',
        voiceNoteDuration: '0:12'
      }
    };
  });

  const [selectedDateKey, setSelectedDateKey] = useState(currentDateInfo.dateKey);
  
  // Interactive Modals State
  const [activeModal, setActiveModal] = useState(null); // 'overview' | 'gratitude' | 'photo' | 'voicenote' | 'weather' | 'writer'
  const [modalSelectedKey, setModalSelectedKey] = useState(currentDateInfo.dateKey);
  const [calendarDate, setCalendarDate] = useState(() => new Date(currentDateInfo.dateKey));

  // Input States for Modals
  const [gratitudeInput, setGratitudeInput] = useState('');
  const [gratitudeEmoji, setGratitudeEmoji] = useState('🪴');
  
  const [writerContent, setWriterContent] = useState('');
  const [writerMood, setWriterMood] = useState('Lovely');

  // Deterministic daily affirmation
  const getDailyAffirmation = (dateKey) => {
    let hash = 0;
    const str = dateKey || 'default';
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AFFIRMATIONS[Math.abs(hash) % AFFIRMATIONS.length];
  };
  const dailyAffirmation = getDailyAffirmation(selectedDateKey);

  // Voice Recording & Playback State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const timerRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlaybackRef = useRef(null);

  // Play Voice Note
  const playVoiceNote = () => {
    if (isPlayingVoice) return;
    const currentUrl = entries[selectedDateKey]?.voiceNoteUrl || 'https://actions.google.com/sounds/v1/ambiences/outdoor_garden.ogg';
    setIsPlayingVoice(true);
    
    try {
      if (!audioPlaybackRef.current) {
        audioPlaybackRef.current = new Audio(currentUrl);
      } else {
        audioPlaybackRef.current.src = currentUrl;
      }
      audioPlaybackRef.current.onended = () => setIsPlayingVoice(false);
      audioPlaybackRef.current.onerror = () => setIsPlayingVoice(false);
      
      const playPromise = audioPlaybackRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn("Audio playback issue:", err);
          setTimeout(() => setIsPlayingVoice(false), 2500);
        });
      }
    } catch (err) {
      console.warn("Playback error:", err);
      setTimeout(() => setIsPlayingVoice(false), 2500);
    }
  };

  const currentEntry = entries[selectedDateKey] || null;
  const modalEntry = entries[modalSelectedKey] || null;

  // Helper to update current entry and persist to localStorage
  const updateCurrentEntry = (fields) => {
    setEntries(prev => {
      const existing = prev[selectedDateKey] || {
        dateKey: selectedDateKey,
        dateStr: `Jul ${selectedDateKey.split('-')[2]}`,
        fullDate: `July ${selectedDateKey.split('-')[2]}, 2026`,
        dayName: 'Day',
        prompt: 'What made you smile today?',
        content: '',
        mood: 'Lovely',
        photoUrl: null,
        gratitude: null,
        voiceNoteDuration: null
      };

      const updated = {
        ...prev,
        [selectedDateKey]: {
          ...existing,
          ...fields
        }
      };

      try {
        localStorage.setItem('mood_garden_journal_entries', JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save entries to localStorage:", e);
      }

      return updated;
    });
  };

  // Explicit Save Journal Entry handler with animation feedback
  const saveCurrentJournalEntry = () => {
    try {
      localStorage.setItem('mood_garden_journal_entries', JSON.stringify(entries));
      setIsSavedToast(true);
      setTimeout(() => setIsSavedToast(false), 2500);
    } catch (e) {
      console.error("Failed to save journal entry:", e);
    }
  };

  // Voice Note Recording Handlers
  const startRecording = async () => {
    setIsRecording(true);
    setRecordingTime(0);
    audioChunksRef.current = [];

    // Start timer counter interval immediately
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setRecordingTime(t => t + 1);
    }, 1000);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            updateCurrentEntry({ voiceNoteUrl: audioUrl });
          }
          stream.getTracks().forEach(track => track.stop());
        };

        recorder.start();
      }
    } catch (err) {
      console.warn('Microphone access not available in environment, using simulated voice recording mode:', err);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const durationSecs = recordingTime > 0 ? recordingTime : 3;
    const durStr = `0:${durationSecs < 10 ? '0' + durationSecs : durationSecs}`;

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
        updateCurrentEntry({ voiceNoteDuration: durStr });
      } catch (e) {
        console.warn("MediaRecorder stop error:", e);
        updateCurrentEntry({ 
          voiceNoteDuration: durStr, 
          voiceNoteUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_garden.ogg' 
        });
      }
    } else {
      // Fallback voice note URL for simulated recording
      updateCurrentEntry({ 
        voiceNoteDuration: durStr, 
        voiceNoteUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_garden.ogg' 
      });
    }

    setActiveModal(null);
  };

  // Real File Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        updateCurrentEntry({ photoUrl: uploadEvent.target.result });
        setActiveModal(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column', 
      position: 'relative',
      backgroundColor: '#FFF8F1',
      overflowY: 'auto',
      overflowX: 'hidden',
      scrollBehavior: 'smooth',
      paddingBottom: '100px'
    }}>
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />

      {/* 1. Header & Hero Section */}
      <div style={{
        padding: '24px 24px 16px',
        position: 'relative',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div>
          <div style={{ fontSize: '15px', color: '#7A6B63', fontWeight: '600' }}>
            {getGreeting()}
          </div>
          <div style={{ 
            fontSize: '28px', 
            color: '#D97979', 
            fontFamily: 'DM Serif Display, serif',
            marginTop: '2px'
          }}>
            Ayenett
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginTop: '6px',
            fontSize: '13px',
            color: '#8A7A71',
            fontWeight: '600'
          }}>
            <span>{currentDateInfo.fullDate}</span>
            <span>•</span>
            <span>{currentDateInfo.dayName}</span>
          </div>
        </div>

        {/* Notebook Illustration Top Right */}
        <img 
          src={imgNotebook} 
          alt="Notebook Illustration" 
          style={{
            position: 'absolute',
            right: '-15px',
            top: '-10px',
            width: '170px',
            height: 'auto',
            objectFit: 'contain',
            opacity: 0.95,
            pointerEvents: 'none',
            mixBlendMode: 'multiply',
            WebkitMaskImage: 'radial-gradient(ellipse at 55% 50%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 75%)',
            maskImage: 'radial-gradient(ellipse at 55% 50%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 75%)'
          }}
        />
      </div>

      {/* 2. Main Journal Notebook Card */}
      <div style={{ padding: '0 24px', marginBottom: '24px' }}>
        <div style={{
          backgroundColor: '#FFFDF9',
          borderRadius: '28px',
          padding: '24px',
          boxShadow: '0 10px 30px rgba(217, 121, 121, 0.08)',
          border: '2px dashed #F5E6DA',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Card Header Title & Edit Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}><img src={flowerImg} alt='flower' style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.2em', display: 'inline-block' }} /></span>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#5C4E46' }}>
                {selectedDateKey === currentDateInfo.dateKey ? "Today’s Journal" : `${currentEntry ? currentEntry.dateStr : 'Journal Entry'}`}
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {currentEntry && (
                <span style={{ 
                  fontSize: '12px', 
                  background: '#FFE4E8', 
                  color: '#D97979', 
                  padding: '4px 12px', 
                  borderRadius: '12px', 
                  fontWeight: '700' 
                }}>
                  {currentEntry.mood}
                </span>
              )}
              
              <button 
                onClick={() => {
                  setWriterContent(currentEntry ? currentEntry.content : '');
                  setWriterMood(currentEntry ? currentEntry.mood : 'Lovely');
                  setActiveModal('writer');
                }}
                style={{
                  background: '#FFF0F2',
                  color: '#D97979',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '14px',
                  fontSize: '12px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <Edit3 size={13} /> {currentEntry ? 'Edit' : 'Write'}
              </button>
            </div>
          </div>

          {/* Prompt */}
          <p style={{ fontSize: '14px', color: '#8C7B73', fontWeight: '700', marginBottom: '18px', fontStyle: 'italic' }}>
            "{currentEntry ? currentEntry.prompt : 'What made you smile today?'}"
          </p>

          {/* Lined Notebook Paper Area */}
          {currentEntry && currentEntry.content ? (
            <div style={{ position: 'relative', minHeight: '140px' }}>
              <div style={{
                fontSize: '14px',
                color: '#5C4E46',
                lineHeight: '32px',
                fontWeight: '500',
                background: 'repeating-linear-gradient(transparent, transparent 31px, #F2E5D9 31px, #F2E5D9 32px)',
                paddingBottom: '8px',
                whiteSpace: 'pre-wrap'
              }}>
                {currentEntry.content}
              </div>

              {/* Voice Note Chip inside Entry (Interactive, Playable & Removable) */}
              {currentEntry?.voiceNoteDuration && (
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={playVoiceNote}
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      background: isPlayingVoice ? '#E9D8FD' : '#F0E6FF',
                      color: '#6B46C1',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '800',
                      border: '1.5px solid #D6BCFA',
                      cursor: 'pointer',
                      boxShadow: isPlayingVoice ? '0 0 12px rgba(107, 70, 193, 0.4)' : '0 2px 8px rgba(0,0,0,0.04)',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                  >
                    {isPlayingVoice ? (
                      <>
                        <span style={{ fontSize: '14px', animation: 'bounce 0.5s infinite alternate' }}>♫</span>
                        <span>Playing Voice Note... ({currentEntry?.voiceNoteDuration})</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} fill="#6B46C1" />
                        <span>Voice Note ({currentEntry?.voiceNoteDuration})</span>
                      </>
                    )}
                  </button>

                  <button 
                    onClick={() => updateCurrentEntry({ voiceNoteDuration: null, voiceNoteUrl: null })}
                    style={{ 
                      background: '#FFF0F2', 
                      border: '1px solid #FFD8E3', 
                      color: '#D97979', 
                      borderRadius: '16px',
                      padding: '6px 12px',
                      fontSize: '11px', 
                      fontWeight: '700', 
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Trash2 size={12} /> Remove voice
                  </button>
                </div>
              )}

              {/* Photo Memory Attachment with Clear Remove Button */}
              {currentEntry?.photoUrl && (
                <div style={{ marginTop: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img 
                    src={currentEntry.photoUrl} 
                    alt="Memory" 
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '16px',
                      objectFit: 'cover',
                      border: '3px solid #FFF',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <div>
                    <span style={{ fontSize: '12px', color: '#5C4E46', fontWeight: '700', display: 'block', marginBottom: '4px' }}>
                      Photo Memory Attached <img src={cameraImg} alt='camera' style={{width:'12px', verticalAlign:'middle'}} />
                    </span>
                    <button 
                      onClick={() => updateCurrentEntry({ photoUrl: null })}
                      style={{ 
                        background: '#FFF0F2', 
                        border: '1px solid #FFD8E3', 
                        color: '#D97979', 
                        borderRadius: '12px',
                        padding: '4px 10px',
                        fontSize: '11px', 
                        fontWeight: '700', 
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Trash2 size={12} /> Remove photo
                    </button>
                  </div>
                </div>
              )}

              {/* SAVE JOURNAL ENTRY BUTTON */}
              <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px dashed #FFEAE0' }}>
                <button 
                  onClick={saveCurrentJournalEntry}
                  style={{
                    width: '100%',
                    backgroundColor: isSavedToast ? '#8DC28B' : '#D97979',
                    color: '#FFF',
                    padding: '12px',
                    borderRadius: '20px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(217, 121, 121, 0.25)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isSavedToast ? (
                    <>
                      <Check size={18} /> Saved for {currentEntry?.dayName || 'Today'}! ✨
                    </>
                  ) : (
                    <>
                      💾 Save Entry for {currentEntry?.dayName || 'Today'}
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div style={{ 
              padding: '28px 16px', 
              textAlign: 'center', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              background: '#FFF8F3',
              borderRadius: '20px',
              border: '1px dashed #F7EADF'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>🐱<img src={flowerImg} alt='flower' style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.2em', display: 'inline-block' }} /></div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#5C4E46', marginBottom: '4px' }}>
                No diary yet for this day
              </h3>
              <p style={{ fontSize: '13px', color: '#9C8F87', fontWeight: '600', marginBottom: '16px' }}>
                Start writing a small memory <img src={flowerImg} alt='flower' style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.2em', display: 'inline-block' }} />
              </p>
              <button 
                onClick={() => {
                  setWriterContent('');
                  setWriterMood('Lovely');
                  setActiveModal('writer');
                }}
                style={{
                  background: '#FFE4E8',
                  color: '#D97979',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '16px',
                  fontSize: '13px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(217, 121, 121, 0.15)',
                  cursor: 'pointer'
                }}
              >
                <Edit3 size={14} /> Add Entry
              </button>
            </div>
          )}

          <div style={{ position: 'absolute', bottom: '12px', right: '16px', opacity: 0.35, fontSize: '16px' }}>
            <img src={flowerImg} alt='flower' style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.2em', display: 'inline-block' }} />
          </div>
        </div>
      </div>

      {/* 3. Diary Overview Carousel Section */}
      <div style={{ padding: '0 24px', marginBottom: '24px' }}>
        <div style={{ 
          backgroundColor: '#FFF',
          borderRadius: '24px',
          padding: '20px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#5C4E46' }}>Diary Overview</h3>
            <button 
              onClick={() => {
                setModalSelectedKey(selectedDateKey);
                setActiveModal('overview');
              }}
              style={{ 
                background: 'transparent',
                border: 'none',
                color: '#D97979',
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              View all <ChevronRight size={14} />
            </button>
          </div>

          {/* Date Chips Carousel */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            overflowX: 'auto', 
            paddingBottom: '4px',
            scrollSnapType: 'x mandatory'
          }}>
            {CarouselDates.map((item) => {
              const isSelected = item.dateKey === selectedDateKey;
              const hasEntry = !!entries[item.dateKey]?.content;

              return (
                <button
                  key={item.dateKey}
                  onClick={() => setSelectedDateKey(item.dateKey)}
                  style={{
                    flex: '0 0 auto',
                    minWidth: '56px',
                    padding: '10px 8px',
                    borderRadius: '16px',
                    border: isSelected ? '2px solid #D97979' : '1px solid #F5EAE0',
                    backgroundColor: isSelected ? '#FFE4E8' : '#FFFDF9',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: hasEntry ? 1 : 0.65
                  }}
                >
                  <span style={{ fontSize: '11px', color: isSelected ? '#C56868' : '#9C8F87', fontWeight: '700' }}>
                    {item.day}
                  </span>
                  <span style={{ fontSize: '13px', color: isSelected ? '#D97979' : '#5C4E46', fontWeight: '800' }}>
                    {item.label.split(' ')[1]}
                  </span>
                  {hasEntry ? (
                    <span style={{ fontSize: '10px', marginTop: '2px' }}><img src={flowerImg} alt='flower' style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.2em', display: 'inline-block' }} /></span>
                  ) : (
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#E0D5CE', marginTop: '4px' }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Action Cards Row (2 Interactive Cards) */}
      <div style={{ padding: '0 24px', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          
          {/* 1. Add Photo Card */}
          <button 
            onClick={() => setActiveModal('photo')}
            style={{
              backgroundColor: '#FFF',
              borderRadius: '20px',
              padding: '14px 10px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              border: '1px solid #F7ECE3',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              outline: 'none'
            }}
          >
            <div style={{ 
              width: '38px', height: '38px', 
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              marginBottom: '8px'
            }}>
              <img src={cameraImg} alt="camera" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#5C4E46', marginBottom: '2px' }}>Add Photo</span>
            <span style={{ fontSize: '10px', color: '#9C8F87', fontWeight: '600' }}>
              {currentEntry?.photoUrl ? <span>Attached <img src={cameraImg} style={{width:'10px', verticalAlign:'middle'}}/></span> : 'Capture moment'}
            </span>
          </button>

          {/* 3. Voice Note Card */}
          <button 
            onClick={() => setActiveModal('voicenote')}
            style={{
              backgroundColor: '#FFF',
              borderRadius: '20px',
              padding: '14px 10px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              border: '1px solid #F7ECE3',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              outline: 'none'
            }}
          >
            <div style={{ 
              width: '38px', height: '38px', 
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              marginBottom: '8px'
            }}>
              <img src={voiceImg} alt="voice" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#5C4E46', marginBottom: '2px' }}>Voice Note</span>
            <span style={{ fontSize: '10px', color: '#9C8F87', fontWeight: '600' }}>
              {currentEntry?.voiceNoteDuration ? <span>Recorded <img src={voiceImg} style={{width:'10px', verticalAlign:'middle'}}/></span> : 'Record thoughts'}
            </span>
          </button>

        </div>
      </div>


      {/* 6. Reminder Card (Static Daily Affirmation) */}
      <div style={{ padding: '0 24px', marginBottom: '24px' }}>
        <div 
          style={{
            width: '100%',
            backgroundColor: '#FFFDF9',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
            border: '1.5px dashed #F2DFD3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'left'
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: '#D97979', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Today’s Reminder <img src={flowerImg} alt='flower' style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.2em', display: 'inline-block' }} />
            </span>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#5C4E46', marginTop: '4px', marginBottom: '2px' }}>
              "{dailyAffirmation}"
            </h4>
          </div>
          <span style={{ fontSize: '28px' }}>🪴</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODALS SECTION (ALL FULLY FUNCTIONAL AND INTERACTIVE) */}
      {/* ========================================================= */}

      {/* 1. GRATITUDE MODAL */}
      {activeModal === 'gratitude' && (
        <div style={modalOverlayStyle}>
          <div style={modalContainerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#5C4E46' }}>🪴 What are you thankful for?</h3>
              <button onClick={() => setActiveModal(null)} style={closeBtnStyle}><X size={18} /></button>
            </div>

            <p style={{ fontSize: '13px', color: '#9C8F87', marginBottom: '16px' }}>
              Record a small moment that warmed your heart today.
            </p>

            <textarea 
              value={gratitudeInput}
              onChange={(e) => setGratitudeInput(e.target.value)}
              placeholder="e.g., A warm cup of floral tea, a sweet text from a friend..."
              style={{
                width: '100%',
                height: '90px',
                borderRadius: '16px',
                border: '1.5px solid #F5EAE0',
                backgroundColor: '#FFFDF9',
                padding: '12px',
                fontSize: '13px',
                color: '#5C4E46',
                outline: 'none',
                marginBottom: '16px',
                fontFamily: 'inherit'
              }}
            />

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {['🪴', '🌸', '(~_~)', '(*~▽~)', '(~_~;)', '(ᵔᴥᵔ)', '(♡´౪`♡)'].map(emoji => (
                <button 
                  key={emoji}
                  onClick={() => setGratitudeEmoji(emoji)}
                  style={{
                    fontSize: '18px',
                    padding: '8px',
                    borderRadius: '12px',
                    border: gratitudeEmoji === emoji ? '2px solid #D97979' : '1px solid #F5EAE0',
                    background: gratitudeEmoji === emoji ? '#FFE4E8' : '#FFF',
                    cursor: 'pointer'
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <button 
              onClick={() => {
                if (gratitudeInput.trim()) {
                  updateCurrentEntry({ gratitude: `${gratitudeInput} ${gratitudeEmoji}` });
                }
                setActiveModal(null);
              }}
              style={primaryBtnStyle}
            >
              Save Gratitude (♡´౪`♡)
            </button>
          </div>
        </div>
      )}

      {/* 2. ADD PHOTO MODAL */}
      {activeModal === 'photo' && (
        <div style={modalOverlayStyle}>
          <div style={modalContainerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#5C4E46' }}><img src={cameraImg} style={{width:'24px', verticalAlign:'middle', marginRight:'8px'}}/> Add Photo Memory</h3>
              <button onClick={() => setActiveModal(null)} style={closeBtnStyle}><X size={18} /></button>
            </div>

            {/* Custom Upload Button */}
            <button 
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '20px',
                border: '2px dashed #D97979',
                backgroundColor: '#FFE4E8',
                color: '#D97979',
                fontWeight: '800',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
            >
              <Camera size={20} /> Upload Photo from Device
            </button>

            <span style={{ fontSize: '12px', fontWeight: '700', color: '#9C8F87', display: 'block', marginBottom: '12px' }}>
              Or choose from Garden Memories:
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {PRESET_PHOTOS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    updateCurrentEntry({ photoUrl: p.url });
                    setActiveModal(null);
                  }}
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                >
                  <img src={p.url} alt={p.label} style={{ width: '100%', height: '90px', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    background: 'rgba(0,0,0,0.5)',
                    color: '#FFF',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '4px',
                    textAlign: 'center'
                  }}>
                    {p.label}
                  </span>
                </button>
              ))}
            </div>

            <button onClick={() => setActiveModal(null)} style={secondaryBtnStyle}>Cancel</button>
          </div>
        </div>
      )}

      {/* 3. VOICE NOTE MODAL */}
      {activeModal === 'voicenote' && (
        <div style={modalOverlayStyle}>
          <div style={modalContainerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#5C4E46' }}><img src={voiceImg} style={{width:'24px', verticalAlign:'middle', marginRight:'8px'}}/> Record Voice Note</h3>
              <button onClick={() => { stopRecording(); setActiveModal(null); }} style={closeBtnStyle}><X size={18} /></button>
            </div>

            <div style={{ 
              padding: '32px 16px', 
              textAlign: 'center',
              backgroundColor: '#F0E6FF',
              borderRadius: '24px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '70px', height: '70px',
                borderRadius: '50%',
                backgroundColor: isRecording ? '#FF6B6B' : '#6B46C1',
                color: '#FFF',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                margin: '0 auto 16px',
                boxShadow: isRecording ? '0 0 20px rgba(255, 107, 107, 0.6)' : '0 6px 16px rgba(107, 70, 193, 0.3)',
                transition: 'all 0.3s ease'
              }}>
                <Mic size={32} />
              </div>

              <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#5C4E46', marginBottom: '4px' }}>
                {isRecording ? 'Recording your thoughts...' : 'Ready to record'}
              </h4>
              
              <span style={{ fontSize: '20px', fontWeight: '800', color: '#6B46C1' }}>
                0:{recordingTime < 10 ? `0${recordingTime}` : recordingTime}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {!isRecording ? (
                <button onClick={startRecording} style={{ ...primaryBtnStyle, backgroundColor: '#6B46C1' }}>
                  Start Recording ♪️
                </button>
              ) : (
                <button onClick={stopRecording} style={{ ...primaryBtnStyle, backgroundColor: '#FF6B6B' }}>
                  Stop & Save Audio ⏹️
                </button>
              )}
            </div>
          </div>
        </div>
      )}




      {/* 6. JOURNAL WRITER MODAL */}
      {activeModal === 'writer' && (
        <div style={modalOverlayStyle}>
          <div style={modalContainerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#5C4E46' }}>
                ✎️ {currentEntry ? 'Edit Journal Entry' : 'Write New Entry'}
              </h3>
              <button onClick={() => setActiveModal(null)} style={closeBtnStyle}><X size={18} /></button>
            </div>

            <span style={{ fontSize: '12px', fontWeight: '700', color: '#9C8F87', display: 'block', marginBottom: '6px' }}>
              Select Mood:
            </span>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {['Happy', 'Calm', 'Lovely', 'Sad', 'Stress'].map(m => (
                <button
                  key={m}
                  onClick={() => setWriterMood(m)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '14px',
                    border: writerMood === m ? '2px solid #D97979' : '1px solid #F5EAE0',
                    background: writerMood === m ? '#FFE4E8' : '#FFF',
                    color: writerMood === m ? '#D97979' : '#7A6B63',
                    fontWeight: '800',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {m}
                </button>
              ))}
            </div>

            <textarea 
              value={writerContent}
              onChange={(e) => setWriterContent(e.target.value)}
              placeholder="Write your peaceful thoughts here..."
              style={{
                width: '100%',
                height: '140px',
                borderRadius: '16px',
                border: '1.5px solid #F5EAE0',
                backgroundColor: '#FFFDF9',
                padding: '14px',
                fontSize: '14px',
                color: '#5C4E46',
                lineHeight: '28px',
                outline: 'none',
                marginBottom: '20px',
                fontFamily: 'inherit',
                background: 'repeating-linear-gradient(transparent, transparent 27px, #F2E5D9 27px, #F2E5D9 28px)'
              }}
            />

            <button 
              onClick={() => {
                if (writerContent.trim()) {
                  updateCurrentEntry({ content: writerContent, mood: writerMood });
                }
                setActiveModal(null);
              }}
              style={primaryBtnStyle}
            >
              Save Entry <img src={flowerImg} alt='flower' style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.2em', display: 'inline-block' }} />
            </button>
          </div>
        </div>
      )}

      {/* 7. MONTHLY DIARY OVERVIEW MODAL */}
      {activeModal === 'overview' && (
        <div style={modalOverlayStyle}>
          <div style={{
            ...modalContainerStyle,
            maxHeight: '85vh',
            overflowY: 'auto'
          }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#5C4E46' }}>My Diary Memories</h3>
                <p style={{ fontSize: '12px', color: '#9C8F87', fontWeight: '600' }}>
                  {calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <button onClick={() => setActiveModal(null)} style={closeBtnStyle}>
                <X size={18} />
              </button>
            </div>

            {/* Month Selector */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              backgroundColor: '#FFF', 
              padding: '12px 16px', 
              borderRadius: '16px', 
              marginBottom: '16px',
              border: '1px solid #F5EAE0'
            }}>
              <ChevronLeft 
                size={18} 
                color="#A09088" 
                style={{ cursor: 'pointer' }} 
                onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))} 
              />
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#5C4E46' }}>
                {calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <ChevronRight 
                size={18} 
                color="#A09088" 
                style={{ cursor: 'pointer' }} 
                onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))} 
              />
            </div>

            {/* Calendar Grid */}
            <div style={{ 
              backgroundColor: '#FFF', 
              borderRadius: '24px', 
              padding: '16px', 
              marginBottom: '20px',
              border: '1px solid #F5EAE0'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px' }}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i} style={{ fontSize: '11px', fontWeight: '800', color: '#A09088' }}>{d}</span>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                {(() => {
                  const year = calendarDate.getFullYear();
                  const month = calendarDate.getMonth();
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const firstDay = new Date(year, month, 1).getDay();
                  const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Mon=0, Sun=6
                  const today = new Date();

                  const cells = [];
                  for (let i = 0; i < startOffset; i++) {
                    cells.push(<div key={`empty-${i}`} />);
                  }

                  for (let d = 1; d <= daysInMonth; d++) {
                    const monthStr = String(month + 1).padStart(2, '0');
                    const dateStr = String(d).padStart(2, '0');
                    const fullKey = `${year}-${monthStr}-${dateStr}`;
                    const hasEntry = !!entries[fullKey]?.content;
                    const isSelected = fullKey === modalSelectedKey;
                    const isToday = year === today.getFullYear() && month === today.getMonth() && d === today.getDate();

                    cells.push(
                      <button
                        key={`day-${d}`}
                        onClick={() => setModalSelectedKey(fullKey)}
                        style={{
                          aspectRatio: '1',
                          borderRadius: '14px',
                          border: isToday ? '2px solid #D97979' : 'none',
                          backgroundColor: isSelected ? '#FFE4E8' : 'transparent',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                      >
                        <span style={{ 
                          fontSize: '12px', 
                          fontWeight: isSelected || isToday ? '800' : '600',
                          color: isSelected ? '#D97979' : '#5C4E46' 
                        }}>
                          {d}
                        </span>
                        {hasEntry && (
                          <span style={{ fontSize: '8px', position: 'absolute', bottom: '2px' }}><img src={flowerImg} alt='flower' style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.2em', display: 'inline-block' }} /></span>
                        )}
                      </button>
                    );
                  }
                  return cells;
                })()}
              </div>
            </div>

            {/* Selected Date Preview Box */}
            {modalEntry && modalEntry.content ? (
              <div style={{ 
                backgroundColor: '#FFFDF9', 
                borderRadius: '20px', 
                padding: '16px', 
                border: '1.5px dashed #F2DFD3',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#5C4E46' }}>{modalEntry.fullDate}</span>
                  <span style={{ fontSize: '11px', background: '#FFE4E8', color: '#D97979', padding: '2px 8px', borderRadius: '10px', fontWeight: '700' }}>
                    {modalEntry.mood}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#8C7B73', fontStyle: 'italic', marginBottom: '8px' }}>"{modalEntry.prompt}"</p>
                <p style={{ fontSize: '12px', color: '#5C4E46', lineHeight: '1.4', marginBottom: '12px' }}>
                  {modalEntry.content.slice(0, 80)}...
                </p>

                <button 
                  onClick={() => {
                    setSelectedDateKey(modalSelectedKey);
                    setActiveModal(null);
                  }}
                  style={primaryBtnStyle}
                >
                  Open Entry <img src={flowerImg} alt='flower' style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.2em', display: 'inline-block' }} />
                </button>
              </div>
            ) : (
              <div style={{ 
                backgroundColor: '#FFFDF9', 
                borderRadius: '20px', 
                padding: '16px', 
                textAlign: 'center',
                border: '1px solid #F5EAE0',
                marginBottom: '16px'
              }}>
                <span style={{ fontSize: '12px', color: '#9C8F87', fontWeight: '600' }}>No diary recorded on July {modalSelectedKey.split('-')[2]}</span>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

// Common Modal Inline Styles
const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(92, 78, 70, 0.4)',
  backdropFilter: 'blur(8px)',
  zIndex: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden'
};

const modalContainerStyle = {
  width: '90%',
  maxWidth: '380px',
  maxHeight: '85vh',
  overflowY: 'auto',
  backgroundColor: '#FFF8F1',
  borderRadius: '32px',
  padding: '24px',
  boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
  margin: '0 auto'
};

const closeBtnStyle = {
  width: '32px', height: '32px',
  borderRadius: '50%',
  backgroundColor: '#FFE4E8',
  color: '#D97979',
  border: 'none',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  cursor: 'pointer'
};

const primaryBtnStyle = {
  width: '100%',
  backgroundColor: '#FFE4E8',
  color: '#D97979',
  border: 'none',
  padding: '12px',
  borderRadius: '16px',
  fontWeight: '800',
  fontSize: '14px',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(217, 121, 121, 0.15)'
};

const secondaryBtnStyle = {
  width: '100%',
  backgroundColor: '#FFF',
  color: '#7A6B63',
  border: '1px solid #F5EAE0',
  padding: '10px',
  borderRadius: '16px',
  fontWeight: '700',
  fontSize: '13px',
  cursor: 'pointer'
};

export default Journal;
