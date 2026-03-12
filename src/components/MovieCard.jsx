import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { getImageUrl } from '../services/api';
import { useFavorites } from '../context/FavoritesContext';

const MovieCard = ({ movie }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className="relative group rounded-xl overflow-hidden bg-brand-dark border border-slate-800 transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-brand-accent/20 cursor-pointer">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="aspect-[2/3] w-full relative">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="w-full h-full object-cover rounded-t-lg group-hover:opacity-75 transition-opacity"
            loading="lazy"
          />
          {/* Overlay with details on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white font-bold text-lg line-clamp-2">{movie.title}</h3>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-brand-accent">
                <Star className="w-4 h-4 fill-current mr-1" />
                <span className="text-white text-sm font-medium">{movie.vote_average?.toFixed(1)}</span>
              </div>
              <span className="text-gray-300 text-xs">{releaseYear}</span>
            </div>
            
            <p className="text-gray-400 text-xs mt-2 line-clamp-3">
              {movie.overview}
            </p>
          </div>
        </div>
      </Link>
      
      {/* Heart button absolute positioned */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 p-2 rounded-full bg-brand-darker/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-800 focus:outline-none z-20 border border-white/10"
      >
        <Heart className={`w-5 h-5 ${favorite ? 'fill-brand-accent text-brand-accent' : 'text-white'}`} />
      </button>
    </div>
  );
};

export default MovieCard;
