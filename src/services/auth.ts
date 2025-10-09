const API_BASE = import.meta.env.VITE_API_BASE || '';

const buildUrl = (path: string) => (API_BASE ? `${API_BASE}${path}` : path);

export type RegisterInput = {
  email: string;
  full_name: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type ForgotPasswordInput = {
  email: string;
};

export type ChangePasswordInput = {
  old_password: string;
  new_password: string;
};

export async function register(input: RegisterInput) {
  const url = buildUrl('/auth/register');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  return await res.json();
}

export async function login(input: LoginInput) {
  const url = buildUrl('/auth/login');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  return await res.json();
}

export async function forgotPassword(input: ForgotPasswordInput) {
  const url = buildUrl('/auth/forgot-password');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  return await res.json();
}

export async function changePassword(input: ChangePasswordInput) {
  const url = buildUrl('/auth/change-password');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  return await res.json();
}


