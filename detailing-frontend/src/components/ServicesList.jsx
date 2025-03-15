import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const ServicesList = () => {
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

  if (loading) {
    return <div className="text-center">Загрузка...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Наши услуги</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service._id} className="bg-white p-4 rounded shadow-md">
            <img
              src={`http://localhost:3100/media/${service.picture}`}
              alt={service.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold">{service.name}</h3>
            <p className="text-gray-600">Стоимость: {service.cost} руб.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;