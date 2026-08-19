/**
 * API configuration and helper utilities for Mood Garden.
 * Supports configurable API base URL via environment variable:
 * VITE_API_BASE_URL (defaults to http://localhost:4000)
 */

export const getApiBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
  }
  return 'http://localhost:4000';
};

/**
 * Fetch user stats and mood breakdown from Express/SQLite backend.
 */
export async function fetchUserStats(selectedMonth, selectedYear) {
  const baseUrl = getApiBaseUrl();
  let url = `${baseUrl}/api/stats`;
  if (selectedMonth && selectedYear) {
    url += `?month=${selectedMonth}&year=${selectedYear}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Submit or update today's mood check-in.
 */
export async function submitMoodCheckin(type, selectedMonth, selectedYear) {
  const baseUrl = getApiBaseUrl();
  let url = `${baseUrl}/api/mood`;
  if (selectedMonth && selectedYear) {
    url += `?month=${selectedMonth}&year=${selectedYear}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}
