import React, { useState, useEffect, useRef, Component } from 'react';
import Onboarding from './screens/Onboarding';
import Garden from './screens/Garden';
import Journal from './screens/Journal';
import Summary from './screens/Summary';
import Journey from './screens/Journey';
import Me from './screens/Me';
import GlobalBottomNav from './components/GlobalBottomNav';
import bgLullabyAudio from './assets/alex-morgan-gentle-baby-sleep-lullaby-dream-530944.mp3';
import { playClickSound } from './utils/sound';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import './index.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 24px', textAlign: 'center', backgroundColor: '#FFF8F1', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '18px', color: '#5C4E46', marginBottom: '8px', fontFamily: 'DM Serif Display, serif' }}>
            Oops! Something went wrong
          </h3>
          <p style={{ fontSize: '13px', color: '#9C8F87', marginBottom: '20px', maxWidth: '240px' }}>
            Let's reset saved data to get back on track seamlessly.
          </p>
          <button
            onClick={() => {
              try {
                localStorage.removeItem('mood_garden_journal_entries');
              } catch (e) {}
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              backgroundColor: '#D97979',
              color: '#FFF',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '20px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(217, 121, 121, 0.25)'
            }}
          >
            Reset Data & Continue ✨
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('Garden');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Configure Capacitor native plugins if running natively
    const initCapacitorPlugins = async () => {
      try {
        await StatusBar.setOverlaysWebView({ overlay: true });
        await StatusBar.setStyle({ style: Style.Dark });
      } catch (e) {}
      try {
        await SplashScreen.hide();
      } catch (e) {}
    };
    initCapacitorPlugins();
  }, []);

  useEffect(() => {
    // Initialize background lullaby audio
    const audio = new Audio(bgLullabyAudio);
    audio.loop = true;
    audio.volume = 0.25; // Soft volume for gentle background music
    audioRef.current = audio;

    // Attempt autoplay
    audio.play().catch((err) => {
      console.log("Autoplay waiting for first user click:", err);
    });

    // Fallback: Start background music on user's first interaction if blocked by browser policy
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused && !audioRef.current.muted) {
        audioRef.current.play().catch(e => console.warn(e));
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Global button click sound effect listener
    const handleButtonClickSound = (e) => {
      const targetBtn = e.target.closest('button, a, [role="button"], input[type="submit"]');
      if (targetBtn) {
        playClickSound();
      }
    };

    window.addEventListener('click', handleButtonClickSound, true);
    return () => window.removeEventListener('click', handleButtonClickSound, true);
  }, []);

  const toggleMusic = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleLogout = () => {
    setHasOnboarded(false);
    setActiveTab('Garden');
  };

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      {!hasOnboarded ? (
        <Onboarding onComplete={() => setHasOnboarded(true)} />
      ) : (
        <ErrorBoundary>
          <div style={{ flex: 1, width: '100%', overflowY: 'auto', position: 'relative', paddingBottom: 'calc(68px + env(safe-area-inset-bottom, 0px))' }}>
            {activeTab === 'Journal' ? (
              <Journal onNavigate={setActiveTab} />
            ) : activeTab === 'Summary' ? (
              <Summary onNavigate={setActiveTab} />
            ) : activeTab === 'Journey' ? (
              <Journey />
            ) : activeTab === 'Me' ? (
              <Me onNavigate={setActiveTab} onLogout={handleLogout} isMuted={isMuted} onToggleMusic={toggleMusic} />
            ) : (
              <Garden onNavigate={setActiveTab} />
            )}
          </div>
          <GlobalBottomNav activeTab={activeTab} onNavigate={setActiveTab} />
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;
