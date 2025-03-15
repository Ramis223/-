import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

const ManageMasters = () => {
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const response = await api.get('/admin/load_masters');
        setMasters(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMasters();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/delete_master/${id}`);
      setMasters(masters.filter((master) => master._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center">Загрузка...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Управление мастерами</h2>
      <Link to="/admin/create-master" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Добавить мастера
      </Link>
      <div className="space-y-4">
        {masters.map((master) => (
          <div key={master._id} className="bg-white p-4 rounded shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">
                  {master.surname} {master.name} {master.patronymic}
                </h3>
                <p className="text-gray-600">{master.specialization}</p>
                <p className="text-gray-600">Телефон: {master.telephone}</p>
              </div>
              <div className="space-x-2">
                <Link
                  to={`/admin/update-master/${master._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Редактировать
                </Link>
                <button
                  onClick={() => handleDelete(master._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMasters;