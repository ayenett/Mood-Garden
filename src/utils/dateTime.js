export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good Morning,';
  if (hour >= 12 && hour < 17) return 'Good Afternoon,';
  return 'Good Evening,';
};

export const getFormattedCurrentDate = () => {
  const now = new Date();
  const fullDate = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  const shortDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const shortDay = now.toLocaleDateString('en-US', { weekday: 'short' });
  const dateKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return { fullDate, dayName, shortDate, shortDay, dateKey };
};

export const getPast7DaysCarousel = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const dayNum = String(d.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${dayNum}`;
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const day = d.toLocaleDateString('en-US', { weekday: 'short' });
    dates.push({ dateKey, label, day });
  }
  return dates;
};
