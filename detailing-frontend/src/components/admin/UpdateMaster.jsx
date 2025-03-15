import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateMaster = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [telephone, setTelephone] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMaster = async () => {
      try {
        const response = await api.get(`/admin/load_masters/${id}`);
        const master = response.data;
        setName(master.name);
        setSurname(master.surname);
        setPatronymic(master.patronymic);
        setTelephone(master.telephone);
        setSpecialization(master.specialization);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMaster();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/admin/update-master/${id}`, {
        name,
        surname,
        patronymic,
        telephone,
        specialization,
      });
      if (response.data.msg) {
        navigate('/admin/masters');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Ошибка при обновлении мастера');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Редактировать мастера</h2>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default UpdateMaster;