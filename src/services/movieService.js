import { tmdbAxios } from './api';

export const movieService = {
  getTrending: async (timeWindow = 'day') => {
    const response = await tmdbAxios.get(`/trending/movie/${timeWindow}`);
    return response.data;
  },
  
  getPopular: async (page = 1) => {
    const response = await tmdbAxios.get(`/movie/popular`, { params: { page } });
    return response.data;
  },

  getTopRated: async (page = 1) => {
    const response = await tmdbAxios.get(`/movie/top_rated`, { params: { page } });
    return response.data;
  },

  getUpcoming: async (page = 1) => {
    const response = await tmdbAxios.get(`/movie/upcoming`, { params: { page } });
    return response.data;
  },

  searchMovies: async (query, page = 1) => {
    if (!query) return { results: [], total_pages: 0 };
    const response = await tmdbAxios.get(`/search/movie`, { params: { query, page } });
    return response.data;
  },

  getMovieDetails: async (id) => {
    const response = await tmdbAxios.get(`/movie/${id}`, {
      params: { append_to_response: 'videos,credits' }
    });
    return response.data;
  }
};
