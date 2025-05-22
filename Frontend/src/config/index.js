const isProd = import.meta.env.PROD;
const API_URL = isProd 
  ? 'https://your-backend-url.vercel.app'  // Replace with your actual backend URL
  : import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const config = {
  apiUrl: API_URL,
  endpoints: {
    login: `${API_URL}/login`,
    register: `${API_URL}/register`,
    me: `${API_URL}/me`,
    update: `${API_URL}/update`,
    leaderboard: `${API_URL}/leaderboard`
  }
}; 