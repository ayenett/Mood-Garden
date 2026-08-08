# 🌸 Mood Garden - แอปบันทึกและติดตามอารมณ์ (Mood Tracker & Journal)

**Mood Garden** เป็นเว็บแอปพลิเคชันสไตล์มินิมอลอบอุ่น (Warm & Cozy Pastel Aesthetics) ที่ช่วยให้คุณติดตามสภาพอารมณ์ บันทึกไดอารี่ประจำวัน เสียง ภาพถ่ายความทรงจำ และเฝ้ามองต้นไม้อารมณ์เติบโตขึ้นในทุกๆ วัน 🌿✨

---

## 🌟 ฟีเจอร์หลัก (Key Features)

### 1. 🏡 หน้าสวนอารมณ์ (Garden Dashboard)
- **ต้นไม้อารมณ์ (Interactive Mood Fruit Tree):** แสดงผลลัพธ์อารมณ์แต่ละประเภทเป็นผลไม้หลากสีสันบนต้นไม้ (Happy 🍊, Calm 🫐, Sad 🍑, Stressed 🍋, Lovely 🍎)
- **เช็คอินอารมณ์ประจำวัน (Daily Mood Check-in):** เลือกอารมณ์ของคุณได้ง่ายๆ ในแต่ละวัน
- **กราฟสรุปสถิติ (Real-time Analytics):** กราฟวงกลม (Pie Chart) แสดงสัดส่วนอารมณ์พร้อมตัวนับสถิติต่อเนื่อง (Days Streak Tracker)

### 2. 📖 สมุดบันทึกความทรงจำ (Daily Journal)
- **แถบเลือกวันที่ย้อนหลัง (7-Day Carousel):** สลับดูและบันทึกอารมณ์ย้อนหลังได้ 7 วันอย่างสะดวกรวดเร็ว
- **บันทึกเสียง (Voice Note):** กดอัดเสียงพูดเพื่อบันทึกความรู้สึก พร้อมปุ่มฟังและลบไฟล์เสียง
- **แนบรูปภาพ (Photo Memory):** อัปโหลดรูปภาพความทรงจำประจำวัน พร้อมปุ่มลบและดูรูปภาพขยายใหญ่
- **ระบบบันทึกถาวร (Persistent Saving):** กดปุ่ม **`💾 Save Entry`** เพื่อบันทึกข้อความ เสียง และรูปภาพลงในระบบความจำถาวร (`localStorage`) ไม่สูญหายเมื่อรีเฟรชหน้าเว็บ

### 3. 🎁 สรุปภาพรวมและกล่องสมบัติ (Summary & Memory Treasure Box)
- **กล่องสมบัติความทรงจำ (Treasure Box):** รวบรวมรูปภาพและไดอารี่ในรูปแบบการ์ดโพลารอยด์นุ่มนวล (Feathered Vignette Masking)
- **ดูรูปภาพทั้งหมด (View All Memories):** ขยายดูภาพถ่ายความทรงจำทั้งหมดแบบเต็มตาและเลื่อนดูได้ครบทุกใบ

### 4. 🎵 ระบบเสียงและเอฟเฟกต์ (Background Music & Sound System)
- **เพลงพื้นหลังคลอเบาๆ (Gentle Lullaby & Dream):** เล่นเพลงบรรยากาศผ่อนคลายนุ่มนวลต่อเนื่องตั้งแต่หน้า Welcome / Login ไปจนถึงทุกหน้าในแอป
- **เสียงเอฟเฟกต์กดปุ่ม (Balloon Burst Sound Effect):** เสียงป๊อปสดใสเบาๆ ในทุกการคลิกปุ่มภายในแอป
- **สวิตช์เปิด/ปิดเสียงในหน้าตั้งค่า (Sound Toggles):** สามารถกดเลือกเปิด/ปิดเสียงเพลงพื้นหลัง และเสียงกดปุ่มแยกกันได้อิสระในหน้า **My Profile**

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend:** React, Vite, CSS (Pastel Custom UI Design System)
- **Icons & Visualization:** Lucide React, Recharts
- **Audio:** HTML5 Web Audio API
- **Backend / Database:** Node.js, Express, SQLite (`database.sqlite`)

---

## 💻 วิธีการติดตั้งและรันโปรเจกต์ (Installation & Setup)

### 1. Clone Repository
```bash
git clone https://github.com/ayenett/Mood-Garden.git
cd Mood-Garden
```

### 2. ติดตั้ง Dependencies
```bash
npm install
```

### 3. เริ่มต้นรันโปรเจกต์ (Development Server)
```bash
npm run dev
```
เปิดบราวเซอร์ไปที่ `http://localhost:5175` (หรือ URL ที่ปรากฏบน Terminal) เพื่อเริ่มใช้งานแอปพลิเคชัน 🌸

---

## 👤 บัญชีผู้พัฒนา (Author)
- **GitHub:** [@ayenett](https://github.com/ayenett)
