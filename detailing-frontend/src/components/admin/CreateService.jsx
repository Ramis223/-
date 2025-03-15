import React, { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateService = () => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('cost', cost);
    formData.append('picture', picture);

    try {
      const response = await api.post('/admin/create_service', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.msg) {
        navigate('/admin/services');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Ошибка при создании услуги');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Добавить услугу</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Название услуги</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Стоимость</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Изображение</label>
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

export default CreateService;