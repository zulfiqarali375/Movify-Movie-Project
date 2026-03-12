import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { CardSkeleton } from '../components/Skeleton';
import { movieService } from '../services/movieService';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const filter = searchParams.get('filter') || 'popular';
  const query = searchParams.get('search');

  const fetchMovies = async (pageNum, isLoadMore = false) => {
    isLoadMore ? setLoadingMore(true) : setLoading(true);
    try {
      let data;
      if (query) {
        data = await movieService.searchMovies(query, pageNum);
      } else {
        switch (filter) {
          case 'trending':
            // TMDB trending doesn't perfectly align with generic pagination easily sometimes but wrapper handles page if passed
            // For simplicity, we fallback to popular if pagination gets tricky or just use generic popular.
            // But let's assume we can fetch popular for this filter 
            data = await movieService.getTrending('week'); 
            break;
          case 'top_rated':
            data = await movieService.getTopRated(pageNum);
            break;
          case 'upcoming':
            data = await movieService.getUpcoming(pageNum);
            break;
          case 'popular':
          default:
            data = await movieService.getPopular(pageNum);
            break;
        }
      }

      if (isLoadMore) {
        setMovies((prev) => [...prev, ...data.results]);
      } else {
        setMovies(data.results);
      }
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching movies for grid', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1); // Reset page on filter/query change
    fetchMovies(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, query]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage, true);
    }
  };

  const getTitle = () => {
    if (query) return `Search Results for "${query}"`;
    switch (filter) {
      case 'trending': return 'Trending Movies';
      case 'top_rated': return 'Top Rated Movies';
      case 'upcoming': return 'Upcoming Movies';
      case 'popular':
      default: return 'Popular Movies';
    }
  };

  return (
    <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">{getTitle()}</h1>
        
        {!query && (
          <div className="flex space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
            {['popular', 'trending', 'top_rated', 'upcoming'].map((f) => (
              <button
                key={f}
                onClick={() => setSearchParams({ filter: f })}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === f ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' : 'bg-brand-dark/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {f.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 15 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie, idx) => (
              // Using index in key as fallback for duplicate search results TMDB sometimes returns
              <MovieCard key={`${movie.id}-${idx}`} movie={movie} />
            ))}
          </div>

          {page < totalPages && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-full transition-colors disabled:opacity-50"
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">No movies found.</p>
        </div>
      )}
    </div>
  );
};

export default Movies;
