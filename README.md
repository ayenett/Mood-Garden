# 🌸 Mood Garden - Cozy Mobile Mood Tracker & Journal App

**Mood Garden** is a warm, aesthetic pastel **Cross-Platform Mobile Application** built with React, Vite, and Capacitor (supporting Android, iOS, PWA, and Web). It empowers users to reflect on their emotions, keep daily voice notes and photo memories, and nurture their interactive mood fruit tree every day on their mobile devices. 📱🌿✨

---

## 🌟 Architecture & Tech Stack

- **Frontend:** React 19, Vite 8, Custom Pastel Design System (CSS)
- **Mobile Container:** Capacitor 8 (Android & iOS native support)
- **Native Plugins:** `@capacitor/haptics`, `@capacitor/status-bar`, `@capacitor/splash-screen`, `@capacitor/keyboard`
- **PWA Support:** `vite-plugin-pwa`, Web App Manifest (`manifest.json`), Service Worker (`sw.js`)
- **Backend:** Node.js Express 5 API server, SQLite 3 database (`database.sqlite`)
- **API Connectivity:** Configurable API base URL via `VITE_API_BASE_URL` (defaults to `http://localhost:4000`)

---

## 💻 Running as a Web App

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Backend Server
```bash
node server.js
```
The Express SQLite backend runs on `http://localhost:4000`.

### 3. Start Frontend Development Server
```bash
npm run dev
```
Open `http://localhost:5173` (or the port specified in terminal) in your browser.

---

## 🤖 Running as an Android App

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Android Studio](https://developer.android.com/studio) with Android SDK and Gradle configured
- Android Emulator or physical Android device connected via USB with Debugging enabled

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build Production Web Application**
   ```bash
   npm run build
   ```

3. **Sync Web Build with Capacitor**
   ```bash
   npm run cap:sync
   ```

4. **Open in Android Studio**
   ```bash
   npm run cap:android
   ```

5. **Run on Android Device / Emulator**
   - In Android Studio, select your Target Device (Emulator or Connected Phone).
   - Click the green **Run** button (Shift + F10).

> **Note on Backend Connection for Android:**
> When running on an Android Emulator, set `VITE_API_BASE_URL=http://10.0.2.2:4000` during build or in a `.env` file so the Android app can reach your local Express server.

---

## 🍎 Running as an iOS App

### Prerequisites
- **macOS** operating system (required for iOS build and Xcode)
- [Xcode](https://developer.apple.com/xcode/) (v15+ recommended) with iOS Simulator installed
- CocoaPods / Swift Package Manager

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build Production Web Application**
   ```bash
   npm run build
   ```

3. **Sync Web Build with Capacitor**
   ```bash
   npm run cap:sync
   ```

4. **Open in Xcode**
   ```bash
   npm run cap:ios
   ```

5. **Run on iOS Simulator / Physical Device**
   - In Xcode, select an iOS Simulator (e.g. iPhone 15 Pro) or connected Apple device.
   - Click the **Play / Run** button (Cmd + R).

---

## 🌐 Progressive Web App (PWA) Support

Mood Garden includes full PWA support with Web App Manifest and Service Worker caching:
- **Manifest:** Located at `public/manifest.json` with theme color `#FFF8EE` and display mode `standalone`.
- **Build PWA:** `npm run build` automatically generates service worker files (`dist/sw.js`).
- Users can install Mood Garden directly to their home screens from Safari (iOS) or Chrome (Android/Desktop).

---

## ⚙️ Environment Variables & Backend Configuration

The frontend connects to the backend API using `src/utils/api.js`.

To configure the API endpoint URL (e.g. for production servers or emulators), create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:4000
```

For Android Emulator testing:
```env
VITE_API_BASE_URL=http://10.0.2.2:4000
```

For real mobile device testing over local Wi-Fi:
```env
VITE_API_BASE_URL=http://<YOUR_LOCAL_COMPUTER_IP>:4000
```

---

## 👤 Author
- **GitHub:** [@ayenett](https://github.com/ayenett)
