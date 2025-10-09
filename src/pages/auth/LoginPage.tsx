import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/AuthCard';
import { login } from '../../services/auth';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!email || !password) {
            setErrorMessage('Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        }

        setIsLoading(true);
        try {
            const data = await login({ email, password });

            if (data.error) {
                setErrorMessage(data.error);
                setSuccessMessage('');
                return;
            }

            if (data.message === 'Login successful' && data.token) {
                localStorage.setItem('access_token', data.token);
                setSuccessMessage('Đăng nhập thành công. Đang chuyển hướng...');
                setErrorMessage('');
                setTimeout(() => navigate('/'), 600);
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
            title="Đăng nhập"
            subtitle="Chào mừng bạn trở lại"
            footer={(
                <div className="flex items-center justify-between text-sm">
                    <Link to="/auth/register" className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">Chưa có tài khoản? Đăng ký</Link>
                    <Link to="/auth/forgot-password" className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">Quên mật khẩu?</Link>
                </div>
            )}
        >
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mật khẩu</label>
                    <input
                        type="password"
                        className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                    {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
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


