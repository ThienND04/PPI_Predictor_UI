import type { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700">
        <div className="px-8 pt-8 pb-4 text-center bg-blue-50 dark:bg-slate-700 rounded-t-2xl border-b border-blue-100 dark:border-slate-700">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
          {subtitle && <p className="text-sm text-slate-600 dark:text-slate-200 mt-1">{subtitle}</p>}
        </div>
        <div className="p-8">
          {children}
        </div>
        {footer && (
          <div className="px-8 pb-8 -mt-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}


