import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { axiosInstance } from '../lib/axios';

const loginPage = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const userLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setIsLoggingIn(true);
    setMessage(null);

    try {
      await axiosInstance.post('/auth/login', {
        email: loginForm.email,
        password: loginForm.password,
      });
      setMessage({ type: 'success', text: 'Logged in successfully!' });
      setTimeout(() => navigate('/admin'), 1500);
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || error.message || 'Login failed',
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <form onSubmit={userLogin} className="space-y-6 max-w-md mx-auto mt-40">
      <h1 className="text-3xl font-bold tracking-tight">Admin Login</h1>
      {message && (
        <div
          className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
            message.type === 'success'
              ? 'border-accent/50 bg-accent/10 text-accent'
              : 'border-destructive/50 bg-destructive/10 text-destructive'
          }`}>
          {message.text}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="Email here"
          value={loginForm.email}
          onChange={(e) =>
            setLoginForm({
              ...loginForm,
              email: e.target.value,
            })
          }
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="Password here"
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm({
              ...loginForm,
              password: e.target.value,
            })
          }
          required
        />
      </div>
      <Button type="submit" className="w-full gap-2" disabled={isLoggingIn}>
        {isLoggingIn ? 'Logging In...' : 'Login'}
      </Button>
    </form>
  );
};

export default loginPage;
