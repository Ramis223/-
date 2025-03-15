import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(`/admin/load_services/${id}`);
        const service = response.data;
        setName(service.name);
        setCost(service.cost);
      } catch (err) {
        console.error(err);
      }
    };
    fetchService();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/admin/update-service/${id}`, {
        name,
        cost,
      });
      if (response.data.msg) {
        navigate('/admin/services');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Ошибка при обновлении услуги');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Редактировать услугу</h2>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default UpdateService;