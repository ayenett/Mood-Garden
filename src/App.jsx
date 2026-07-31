import React, { useState } from 'react';
import Onboarding from './screens/Onboarding';
import Garden from './screens/Garden';
import Journal from './screens/Journal';
import Summary from './screens/Summary';
import GlobalBottomNav from './components/GlobalBottomNav';
import './index.css';

function App() {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('Garden');

  return (
    <div className="app-container">
      {!hasOnboarded ? (
        <Onboarding onComplete={() => setHasOnboarded(true)} />
      ) : (
        <>
          <div style={{ flex: 1, width: '100%', overflowY: 'auto', position: 'relative' }}>
            {activeTab === 'Journal' ? (
              <Journal onNavigate={setActiveTab} />
            ) : activeTab === 'Summary' ? (
              <Summary onNavigate={setActiveTab} />
            ) : (
              <Garden onNavigate={setActiveTab} />
            )}
          </div>
          <GlobalBottomNav activeTab={activeTab} onNavigate={setActiveTab} />
        </>
      )}
    </div>
  );
}

export default App;
