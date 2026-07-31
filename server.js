import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
app.use(cors());
app.use(express.json());

let db;

async function initDB() {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Create tables if they do not exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_stats (
      id INTEGER PRIMARY KEY,
      name TEXT,
      coins INTEGER,
      streak INTEGER,
      last_checkin TEXT,
      total_flowers INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS moods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Insert default user if not exists (simulating our user Ayenett)
  const user = await db.get('SELECT * FROM user_stats WHERE id = 1');
  if (!user) {
    await db.run('INSERT INTO user_stats (id, name, coins, streak, last_checkin, total_flowers) VALUES (1, "Ayenett", 580, 42, NULL, 73)');
  }
}

// Initialize Database on boot
initDB().catch(console.error);

// -------------------------
// API ROUTES
// -------------------------

// GET /api/stats -> Returns user stats and total mood counts
app.get('/api/stats', async (req, res) => {
  try {
    const user = await db.get('SELECT * FROM user_stats WHERE id = 1');
    
    if (user.last_checkin) {
      const lastCheckinDate = new Date(user.last_checkin + 'Z');
      const now = new Date();
      const diffTime = Math.abs(now - lastCheckinDate);
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      if (diffDays > 5) {
        await db.run('UPDATE user_stats SET streak = 1 WHERE id = 1');
        user.streak = 1;
      }
    }

    const moodCounts = await db.all('SELECT type, COUNT(*) as count FROM moods GROUP BY type');
    
    // Structure counts so the frontend can easily read them
    const countMap = { happy: 0, calm: 0, sad: 0, stress: 0, loved: 0 };
    moodCounts.forEach(m => countMap[m.type] = m.count);

    // Initial mock data overrides if DB is empty, just so the tree doesn't look empty immediately
    if (Object.values(countMap).reduce((a,b)=>a+b, 0) === 0) {
      countMap.happy = 45;
      countMap.calm = 32;
      countMap.loved = 28;
      countMap.sad = 14;
      countMap.stress = 18;
    }

    res.json({
      success: true,
      user,
      moods: countMap
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/mood -> Logs a new mood, updates coins & flowers, returns updated stats
app.post('/api/mood', async (req, res) => {
  const { type } = req.body;
  try {
    // 1. Insert new mood
    await db.run('INSERT INTO moods (type) VALUES (?)', [type]);
    
    const user = await db.get('SELECT * FROM user_stats WHERE id = 1');
    let newStreak = user.streak;
    
    if (user.last_checkin) {
      const lastCheckinDate = new Date(user.last_checkin + 'Z');
      const now = new Date();
      
      const isDifferentDay = lastCheckinDate.getUTCFullYear() !== now.getUTCFullYear() || 
                             lastCheckinDate.getUTCMonth() !== now.getUTCMonth() || 
                             lastCheckinDate.getUTCDate() !== now.getUTCDate();
                             
      const diffTime = Math.abs(now - lastCheckinDate);
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
      if (diffDays > 5) {
        newStreak = 1; // Restart streak
      } else if (isDifferentDay) {
        newStreak += 1; // Increment streak if it's a new day
      }
    } else {
      newStreak = 1; // First checkin
    }

    // 2. Update user stats
    await db.run(`
      UPDATE user_stats 
      SET coins = coins + 10, 
          total_flowers = total_flowers + 1, 
          last_checkin = CURRENT_TIMESTAMP,
          streak = ?
      WHERE id = 1
    `, [newStreak]);
    
    // 3. Fetch and return the updated state
    const updatedUser = await db.get('SELECT * FROM user_stats WHERE id = 1');
    const moodCounts = await db.all('SELECT type, COUNT(*) as count FROM moods GROUP BY type');
    
    const countMap = { happy: 0, calm: 0, sad: 0, stress: 0, loved: 0 };
    moodCounts.forEach(m => countMap[m.type] = m.count);
    
    // Same fallback if somehow empty (though it shouldn't be now)
    if (Object.values(countMap).reduce((a,b)=>a+b, 0) === 0) {
      countMap.happy = 45;
      countMap.calm = 32;
      countMap.loved = 28;
      countMap.sad = 14;
      countMap.stress = 18;
    }

    res.json({
      success: true,
      user: updatedUser,
      moods: countMap
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
