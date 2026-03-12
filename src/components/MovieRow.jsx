import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { CardSkeleton } from './Skeleton';

const MovieRow = ({ title, fetchFn }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchFn();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [fetchFn]);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8 relative">
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      
      <div className="group relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <div 
          ref={rowRef}
          className="flex overflow-x-scroll scrollbar-hide space-x-4 p-4 pt-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px]">
                  <CardSkeleton />
                </div>
              ))
            : movies.map((movie) => (
                <div key={movie.id} className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px]">
                  <MovieCard movie={movie} />
                </div>
              ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
