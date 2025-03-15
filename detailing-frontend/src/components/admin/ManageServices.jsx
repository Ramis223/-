import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/admin/load_services');
        setServices(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/delete_service/${id}`);
      setServices(services.filter((service) => service._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center">Загрузка...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Управление услугами</h2>
      <Link to="/admin/create-service" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Добавить услугу
      </Link>
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service._id} className="bg-white p-4 rounded shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{service.name}</h3>
                <p className="text-gray-600">Стоимость: {service.cost} руб.</p>
              </div>
              <div className="space-x-2">
                <Link
                  to={`/admin/update-service/${service._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Редактировать
                </Link>
                <button
                  onClick={() => handleDelete(service._id)}
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

export default ManageServices;