import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/AuthCard';
import { forgotPassword } from '../../services/auth';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError('Vui lòng nhập email');
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword({ email });
      setSuccess('Mã OTP đã được gửi đến email của bạn.');
      setTimeout(() => navigate(`/auth/reset-password?email=${encodeURIComponent(email)}`), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gửi yêu cầu thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Quên mật khẩu"
      subtitle="Nhập email để nhận mã OTP"
      footer={(
        <div className="text-sm text-center">
          <Link to="/auth/login" className="text-emerald-700 hover:text-emerald-800">Quay lại đăng nhập</Link>
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
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Đang gửi...' : 'Gửi mã OTP'}
        </button>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded">{success}</div>}
      </form>
    </AuthCard>
  );
}


