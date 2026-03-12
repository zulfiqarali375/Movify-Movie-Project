import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '49ad9500f1030642e9996811bba9c3f8';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbAxios = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getImageUrl = (path, size = 'original') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
