import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const MastersList = () => {
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

  if (loading) {
    return <div className="text-center">Загрузка...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Наши мастера</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {masters.map((master) => (
          <div key={master._id} className="bg-white p-4 rounded shadow-md">
            <img
              src={`http://localhost:3100/media/${master.picture}`}
              alt={master.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold">
              {master.surname} {master.name} {master.patronymic}
            </h3>
            <p className="text-gray-600">{master.specialization}</p>
            <p className="text-gray-600">Телефон: {master.telephone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MastersList;