import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">My Favorites</h1>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 flex flex-col items-center">
          <div className="w-24 h-24 mb-6 rounded-full bg-gray-800 flex items-center justify-center">
            <span className="text-4xl">💔</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">No favorites yet</h2>
          <p className="text-gray-500 max-w-md">
            You haven't added any movies to your favorites list. Browse around and click the heart icon on a movie to save it here!
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
