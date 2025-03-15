import React, { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateMaster = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('patronymic', patronymic);
    formData.append('telephone', telephone);
    formData.append('password', password);
    formData.append('specialization', specialization);
    formData.append('picture', picture);

    try {
      const response = await api.post('/admin/create_master', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.msg) {
        navigate('/admin/masters');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Ошибка при создании мастера');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Добавить мастера</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Имя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Фамилия</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Отчество</label>
          <input
            type="text"
            value={patronymic}
            onChange={(e) => setPatronymic(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Телефон</label>
          <input
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Специализация</label>
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Выберите специализацию</option>
            <option value="Мойка">Мойка</option>
            <option value="Полировка">Полировка</option>
            <option value="Защита кузова">Защита кузова</option>
            <option value="Химчистка салона">Химчистка салона</option>
            <option value="Покрытие керамикой">Покрытие керамикой</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Фото</label>
          <input
            type="file"
            onChange={(e) => setPicture(e.target.files[0])}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Создать
        </button>
      </form>
    </div>
  );
};

export default CreateMaster;