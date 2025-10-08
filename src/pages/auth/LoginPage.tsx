import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/AuthCard';
import { login } from '../../services/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    setIsLoading(true);
    try {
      const data = await login({ email, password });
      if (!data?.access_token) throw new Error('Phản hồi không hợp lệ');
      localStorage.setItem('access_token', data.access_token);
      const user = data.user || { email };
      sessionStorage.setItem('user', JSON.stringify({ email: user.email, full_name: user.full_name }));
      setSuccess('Đăng nhập thành công. Đang chuyển hướng...');
      setTimeout(() => navigate('/'), 600);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Đăng nhập"
      subtitle="Chào mừng bạn trở lại"
      footer={(
        <div className="flex items-center justify-between text-sm">
          <Link to="/auth/register" className="text-emerald-700 hover:text-emerald-800">Chưa có tài khoản? Đăng ký</Link>
          <Link to="/auth/forgot-password" className="text-emerald-700 hover:text-emerald-800">Quên mật khẩu?</Link>
        </div>
      )}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded">{success}</div>}
      </form>
    </AuthCard>
  );
}


