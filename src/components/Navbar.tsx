import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from './ThemeContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string | null>(
    () => (typeof window !== 'undefined' ? localStorage.getItem('access_token') : null)
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/input', label: 'Dự đoán' },
    { path: '/history', label: 'Lịch sử' }
  ];

  const userInitial = useMemo(() => {
    try {
      const rawUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        const name: string | undefined = parsed?.name || parsed?.username || parsed?.email;
        if (name && typeof name === 'string') {
          return (name.trim()[0] || 'U').toUpperCase();
        }
      }
    } catch {
      // ignore parse errors
    }
    return 'U';
  }, [accessToken]);

  useEffect(() => {
    const handleStorage = () => {
      setAccessToken(localStorage.getItem('access_token'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    setAccessToken(localStorage.getItem('access_token'));
  }, [location.pathname]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('access_token');
    } finally {
      setIsMenuOpen(false);
      setAccessToken(null);
      navigate('/auth/login');
    }
  };

  return (
    <nav className="bg-white/90 dark:bg-slate-800/90 backdrop-blur shadow-lg fixed w-full top-0 z-[9999] border-b border-gray-200 dark:border-slate-700">
      <div className="w-full px-6">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Left: Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-lg p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-100">Protein Interaction Predictor</span>
            </Link>
          </div>

          {/* Center: Nav links */}
          <div className="flex justify-center">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-700 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-500'
                      : 'text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Auth actions or Avatar */}
          <div className="flex justify-end items-center space-x-3">
            {!accessToken ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/auth/login"
                  className="px-4 py-2 text-sm rounded-full border border-blue-300 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/auth/register"
                  className="px-4 py-2 text-sm rounded-full text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                >
                  Đăng ký
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  aria-label="user-menu"
                  onClick={() => setIsMenuOpen((v) => !v)}
                  className="w-9 h-9 rounded-full bg-blue-600 dark:bg-blue-700 text-white flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {userInitial}
                </button>
                {/* Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-blue-100 dark:border-slate-700 overflow-hidden transform transition-all duration-150 origin-top-right ${
                    isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm text-slate-700 dark:text-slate-200">Dark mode</span>
                    <button
                      onClick={toggleTheme}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-400"
                  >
                    Trang cá nhân
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-slate-700"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}