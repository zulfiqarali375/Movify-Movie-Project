import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-darker pt-16 pb-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="mb-4 md:mb-0 flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 via-purple-500 to-indigo-500 rounded-full blur-[6px] opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center w-8 h-8 bg-slate-900 rounded-full border border-white/20 z-10">
                <Play className="w-3 h-3 text-white ml-0.5 fill-white group-hover:text-rose-400 group-hover:fill-rose-400 transition-colors duration-300" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:to-white transition-all duration-300">
              Movify
            </span>
          </Link>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Help Center</a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>&copy; {currentYear} Free Cinema Project. Developed by codewithzulfi</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
