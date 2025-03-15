import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.get(`/admin/load_clients/${id}`);
        const client = response.data;
        setName(client.name);
        setSurname(client.surname);
        setPatronymic(client.patronymic || '');
        setTelephone(client.telephone);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClient();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/admin/update-client/${id}`, {
        name,
        surname,
        patronymic,
        telephone,
      });
      setSuccess('Данные клиента успешно обновлены');
      setError('');
      navigate('/admin/clients'); // Перенаправляем на страницу управления клиентами
    } catch (err) {
      setError(err.response?.data?.msg || 'Ошибка при обновлении данных клиента');
      setSuccess('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Редактировать клиента</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default UpdateClient;