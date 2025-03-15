import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import api from '../api/axios';
import useAuthStore from '../store/authStore';

const Login = () => {
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setUser } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/login', { telephone, password });
      setToken(response.data.token);
      setUser(response.data.client);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Вход</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Телефон</label>
          <input
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mb-4">
          Войти
        </button>
        <div className="text-center">
          <span className="text-gray-600">Нет аккаунта? </span>
          <Link to="/register" className="text-blue-500 hover:underline">
            Создать аккаунт
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;