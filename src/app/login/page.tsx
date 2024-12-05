'use client';
import { useState } from 'react';
import Image from 'next/image';
import axios from '../../lib/axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Login() {
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('loginSuccess', 'true');
      router.push('/dashboard');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro desconhecido';
      toast(errorMessage, {
        style: {
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px',
        },
        position: 'top-right',
      });
    }
  };

  const handleSubmitCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastStyle = {
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px',
    };

    try {
      const response = await axios.post('/users', { email, password });
      const { token, message } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('loginSuccess', 'true');

      toast(message || 'Usuário criado com sucesso!', {
        style: { ...toastStyle, backgroundColor: 'green' },
        position: 'top-right',
      });

      router.push('/login');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Erro ao criar usuário.';

      toast(errorMessage, {
        style: toastStyle,
        position: 'top-right',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <Image src="/assets/logo.svg" alt="Logo" width={105} height={64} />
        </div>
        <h2 className="text-white text-2xl mb-6 text-center">Task Manager</h2>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setTab('login')}
            className={`px-4 py-2 rounded-t-lg ${
              tab === 'login'
                ? 'bg-primary text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab('register')}
            className={`px-4 py-2 rounded-t-lg ${
              tab === 'register'
                ? 'bg-primary text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            Cadastro
          </button>
        </div>

        {tab === 'login' && (
          <form onSubmit={handleSubmitLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="text-white text-md block mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="text-white text-md block mb-2"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite sua senha"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-md transition duration-300"
            >
              Entrar
            </button>
          </form>
        )}

        {tab === 'register' && (
          <form onSubmit={handleSubmitCreateUser}>
            <div className="mb-4">
              <label htmlFor="email" className="text-white text-md block mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="text-white text-md block mb-2"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite sua senha"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-md transition duration-300"
            >
              Cadastrar usuário
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
