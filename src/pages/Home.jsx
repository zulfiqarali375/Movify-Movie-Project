import { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { getImageUrl } from '../services/api';
import MovieRow from '../components/MovieRow';
import { BannerSkeleton } from '../components/Skeleton';

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await movieService.getTrending('day');
        // Get a random movie from top 10 trending for banner
        const randIndex = Math.floor(Math.random() * 10);
        setFeaturedMovie(data.results[randIndex]);
      } catch (error) {
        console.error('Failed to fetch featured movie', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Banner Section */}
      {loading ? (
        <BannerSkeleton />
      ) : featuredMovie ? (
        <div className="relative h-[70vh] md:h-[85vh] w-full">
          <div className="absolute inset-0">
            <img
              src={getImageUrl(featuredMovie.backdrop_path, 'original')}
              alt={featuredMovie.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay for modern effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-darker via-brand-darker/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-darker via-brand-darker/80 to-transparent" />
            <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay" />
          </div>

          <div className="absolute bottom-[20%] left-4 md:left-12 max-w-2xl px-4 text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
              {featuredMovie.title || featuredMovie.name}
            </h1>
            <p className="text-gray-300 text-sm mb-4 max-w-lg line-clamp-3 md:text-base drop-shadow-md">
              {featuredMovie.overview}
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                to={`/movie/${featuredMovie.id}`}
                className="flex items-center justify-center px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-brand-accent to-purple-600 text-white rounded-xl font-bold hover:scale-105 hover:shadow-lg hover:shadow-brand-accent/30 transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Play Now
              </Link>
              <Link
                to={`/movie/${featuredMovie.id}`}
                className="flex items-center justify-center px-6 py-2 md:px-8 md:py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-all duration-300"
              >
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {/* Movie Rows */}
      <div className="pb-12 mt-[-60px] md:mt-[-100px] z-20 relative">
        <MovieRow title="Trending Now" fetchFn={() => movieService.getTrending('day')} />
        <MovieRow title="Popular" fetchFn={() => movieService.getPopular()} />
        <MovieRow title="Top Rated" fetchFn={() => movieService.getTopRated()} />
        <MovieRow title="Upcoming" fetchFn={() => movieService.getUpcoming()} />
      </div>
    </div>
  );
};

export default Home;
