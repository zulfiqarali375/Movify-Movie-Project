import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Heart, Play } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Handle scroll effect for navbar background
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Trending', path: '/movies?filter=trending' },
    { name: 'Top Rated', path: '/movies?filter=top_rated' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/80 backdrop-blur-lg border-b border-white/10 shadow-lg' : 'bg-transparent bg-gradient-to-b from-brand-darker/80 to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 via-purple-500 to-indigo-500 rounded-full blur-[10px] opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>

              <div className="relative flex items-center justify-center w-10 h-10 bg-slate-900 rounded-full border border-white/20 shadow-2xl z-10 overflow-hidden group-hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                <Play className="w-4 h-4 text-white ml-0.5 fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:text-rose-400 group-hover:fill-rose-400 transition-all duration-300" />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-purple-200 drop-shadow-sm group-hover:to-white transition-all duration-300">
                Movify
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-brand-dark/50 border border-slate-700 text-white text-sm rounded-full focus:ring-brand-accent focus:border-brand-accent block w-full pl-10 p-2 placeholder-slate-400 focus:outline-none focus:ring-1 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </form>

            <Link to="/favorites" className="text-gray-300 hover:text-white transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/favorites" className="text-gray-300 hover:text-white">
              <Heart className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-dark border-b border-white/10 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearch} className="relative mb-4 px-3">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800/50 border border-gray-600 text-white text-sm rounded-md block w-full pl-10 p-2"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-6 top-3" />
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
