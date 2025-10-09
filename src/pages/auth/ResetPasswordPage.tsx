import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/AuthCard';
import { changePassword } from '../../services/auth';

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp');
      return;
    }

    setIsLoading(true);
    try {
      const data = await changePassword({ old_password: oldPassword, new_password: newPassword });
      
      if (data.error) {
        setErrorMessage(data.error);
        setSuccessMessage('');
        return;
      }
      
      if (data.message === 'Password changed successfully') {
        setSuccessMessage('Đổi mật khẩu thành công');
        setErrorMessage('');
        setTimeout(() => navigate('/auth/login'), 800);
      } else {
        setErrorMessage('Phản hồi không hợp lệ từ server');
        setSuccessMessage('');
      }
    } catch (err) {
      setErrorMessage('Server error. Please try again later.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Đổi mật khẩu"
      subtitle="Nhập mật khẩu cũ và mật khẩu mới"
      footer={(
        <div className="text-sm text-center">
          <Link to="/auth/login" className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">Quay lại đăng nhập</Link>
        </div>
      )}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mật khẩu cũ</label>
          <input
            type="password"
            className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 focus:ring-primary focus:border-primary outline-none"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mật khẩu mới</label>
          <input
            type="password"
            className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 focus:ring-primary focus:border-primary outline-none"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 focus:ring-primary focus:border-primary outline-none"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
        </button>
        
        {errorMessage && (
          <p className="mt-2 text-sm text-red-500 dark:text-red-400 font-medium">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="mt-2 text-sm text-green-500 dark:text-green-400 font-medium">{successMessage}</p>
        )}
      </form>
    </AuthCard>
  );
}


