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
      <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-lg border border-blue-100">
        <div className="px-8 pt-8 pb-4 text-center bg-blue-50 rounded-t-2xl border-b border-blue-100">
          <h1 className="text-2xl font-bold text-blue-800">{title}</h1>
          {subtitle && <p className="text-sm text-blue-700 mt-1">{subtitle}</p>}
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


