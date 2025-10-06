import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  // Định nghĩa background color cho từng trang
  const getBackgroundColor = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'bg-gradient-to-br from-blue-50 to-indigo-100'; // Home: Blue gradient
      case '/input':
        return 'bg-gradient-to-br from-green-50 to-emerald-100'; // Input: Green gradient
      case '/result':
        return 'bg-gradient-to-br from-purple-50 to-violet-100'; // Result: Purple gradient
      case '/history':
        return 'bg-gradient-to-br from-orange-50 to-amber-100'; // History: Orange gradient
      default:
        return 'bg-gray-50'; // Default
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundColor(location.pathname)}`}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12 pt-20">
        {children}
      </div>
    </div>
  );
}
