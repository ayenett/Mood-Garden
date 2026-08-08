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

// GET /api/stats -> Returns user stats, todayMood, and total mood counts
app.get('/api/stats', async (req, res) => {
  try {
    const user = await db.get('SELECT * FROM user_stats WHERE id = 1');
    
    // Check if user has checked in today
    const existingTodayMood = await db.get(
      "SELECT type FROM moods WHERE date(timestamp, 'localtime') = date('now', 'localtime') ORDER BY id DESC LIMIT 1"
    );

    const { month, year } = req.query;
    let moodCounts;
    
    if (month && year) {
      const paddedMonth = String(month).padStart(2, '0');
      moodCounts = await db.all(
        "SELECT type, COUNT(*) as count FROM moods WHERE strftime('%m', timestamp) = ? AND strftime('%Y', timestamp) = ? GROUP BY type",
        [paddedMonth, year]
      );
    } else {
      moodCounts = await db.all('SELECT type, COUNT(*) as count FROM moods GROUP BY type');
    }
    
    const countMap = { happy: 0, calm: 0, sad: 0, stress: 0, loved: 0 };
    moodCounts.forEach(m => {
      if (countMap[m.type] !== undefined) countMap[m.type] = m.count;
    });

    res.json({
      success: true,
      user,
      todayMood: existingTodayMood ? existingTodayMood.type : null,
      moods: countMap
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/mood -> Logs or updates today's mood (1 checkin per day, supports same-day mood change)
app.post('/api/mood', async (req, res) => {
  const { type } = req.body;
  try {
    // Check if user already checked in today
    const existingTodayMood = await db.get(
      "SELECT id, type FROM moods WHERE date(timestamp, 'localtime') = date('now', 'localtime') ORDER BY id DESC LIMIT 1"
    );

    let updatedTodayMood = type;

    if (existingTodayMood) {
      // 1. User ALREADY checked in today -> UPDATE today's mood (no extra coins or flowers)
      await db.run(
        "UPDATE moods SET type = ?, timestamp = CURRENT_TIMESTAMP WHERE id = ?",
        [type, existingTodayMood.id]
      );
    } else {
      // 2. FIRST check-in of today -> INSERT new mood & update coins, flowers, streak
      await db.run('INSERT INTO moods (type) VALUES (?)', [type]);

      const user = await db.get('SELECT * FROM user_stats WHERE id = 1');
      let newStreak = user.streak || 1;

      if (user.last_checkin) {
        const lastCheckinDate = new Date(user.last_checkin + 'Z');
        const now = new Date();
        const isDifferentDay = lastCheckinDate.getUTCFullYear() !== now.getUTCFullYear() || 
                               lastCheckinDate.getUTCMonth() !== now.getUTCMonth() || 
                               lastCheckinDate.getUTCDate() !== now.getUTCDate();
        if (isDifferentDay) {
          newStreak = (user.streak || 0) + 1;
        }
      }

      await db.run(`
        UPDATE user_stats 
        SET coins = coins + 10, 
            total_flowers = total_flowers + 1, 
            last_checkin = CURRENT_TIMESTAMP,
            streak = ?
        WHERE id = 1
      `, [newStreak]);
    }

    // Return updated state
    const updatedUser = await db.get('SELECT * FROM user_stats WHERE id = 1');

    const { month, year } = req.query;
    let moodCounts;
    if (month && year) {
      const paddedMonth = String(month).padStart(2, '0');
      moodCounts = await db.all(
        "SELECT type, COUNT(*) as count FROM moods WHERE strftime('%m', timestamp) = ? AND strftime('%Y', timestamp) = ? GROUP BY type",
        [paddedMonth, year]
      );
    } else {
      moodCounts = await db.all('SELECT type, COUNT(*) as count FROM moods GROUP BY type');
    }

    const countMap = { happy: 0, calm: 0, sad: 0, stress: 0, loved: 0 };
    moodCounts.forEach(m => {
      if (countMap[m.type] !== undefined) countMap[m.type] = m.count;
    });

    res.json({
      success: true,
      user: updatedUser,
      todayMood: updatedTodayMood,
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
