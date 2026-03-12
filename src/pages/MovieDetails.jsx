import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Star, Clock, Calendar, Heart } from 'lucide-react';
import { movieService } from '../services/movieService';
import { getImageUrl } from '../services/api';
import { useFavorites } from '../context/FavoritesContext';
import { BannerSkeleton } from '../components/Skeleton';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await movieService.getMovieDetails(id);
        setMovie(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div className="pt-16"><BannerSkeleton /></div>;
  if (!movie) return <div className="pt-24 text-center text-white">Movie not found</div>;

  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const cast = movie.credits?.cast?.slice(0, 10).filter(c => c.profile_path);
  const favorite = isFavorite(movie.id);

  const toggleFavorite = () => {
    if (favorite) removeFavorite(movie.id);
    else addFavorite(movie);
  };

  return (
    <div className="bg-brand-darker min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/80 to-transparent" />
          <div className="absolute inset-0 bg-brand-accent/5 mix-blend-overlay" />
        </div>

        <div className="absolute inset-0 flex items-center pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Poster */}
            <div className="w-48 md:w-80 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl shadow-black">
              <img
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-full h-auto"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-white flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6 text-sm text-slate-300">
                <span className="flex items-center text-brand-accent font-semibold bg-brand-accent/10 px-2 py-1 rounded-md">
                  <Star className="w-4 h-4 fill-current mr-1 text-brand-accent" />
                  {movie.vote_average?.toFixed(1)}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(movie.release_date).getFullYear()}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {movie.runtime} min
                </span>
                <div className="flex gap-2">
                  {movie.genres?.map(g => (
                    <span key={g.id} className="px-2 py-1 bg-gray-800 rounded-md text-xs">{g.name}</span>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">
                {movie.overview}
              </p>

              <div className="flex space-x-4">
                {trailer && (
                  <button
                    onClick={() => {
                        document.getElementById('trailer-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-brand-accent to-purple-600 text-white rounded-xl font-bold hover:scale-105 hover:shadow-lg hover:shadow-brand-accent/30 transition-all duration-300"
                  >
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    Watch Trailer
                  </button>
                )}
                <button
                  onClick={toggleFavorite}
                  className="flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
                >
                  <Heart className={`w-5 h-5 mr-2 ${favorite ? 'fill-brand-accent text-brand-accent' : ''}`} />
                  {favorite ? 'Added to Favorites' : 'Add to Favorites'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-24">
        {/* Cast Section */}
        {cast && cast.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Top Cast</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
              {cast.map(person => (
                <div key={person.id} className="flex-none w-32 md:w-40 text-center">
                  <img
                    src={getImageUrl(person.profile_path, 'w185')}
                    alt={person.name}
                    className="w-full aspect-[2/3] object-cover rounded-lg mb-2 shadow-lg"
                  />
                  <h3 className="text-white text-sm font-semibold truncate">{person.name}</h3>
                  <p className="text-gray-400 text-xs truncate">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trailer Section */}
        {trailer && (
          <div id="trailer-section" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Official Trailer</h2>
            <div className="aspect-video w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-xl">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
