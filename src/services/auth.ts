import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || '';

const buildUrl = (path: string) => (API_BASE ? `${API_BASE}${path}` : path);

export type RegisterInput = {
  full_name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type ForgotPasswordInput = {
  email: string;
};

export type ResetPasswordInput = {
  email: string;
  otp_code: string;
  new_password: string;
};

export async function register(input: RegisterInput) {
  const url = buildUrl('/api/auth/register');
  const res = await axios.post(url, input, { headers: { 'Content-Type': 'application/json' } });
  return res.data;
}

export async function login(input: LoginInput) {
  const url = buildUrl('/api/auth/login');
  const res = await axios.post(url, input, { headers: { 'Content-Type': 'application/json' } });
  return res.data as { access_token: string; user?: { email?: string; full_name?: string } };
}

export async function forgotPassword(input: ForgotPasswordInput) {
  const url = buildUrl('/api/auth/forgot-password');
  const res = await axios.post(url, input, { headers: { 'Content-Type': 'application/json' } });
  return res.data;
}

export async function resetPassword(input: ResetPasswordInput) {
  const url = buildUrl('/api/auth/reset-password');
  const res = await axios.post(url, input, { headers: { 'Content-Type': 'application/json' } });
  return res.data;
}


