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
        return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800';
      case '/input':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800';
      case '/result':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800';
      case '/results':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800';
      case '/history':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800';
      default:
        return 'bg-[#f9fafb] dark:bg-[#0f172a]';
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
