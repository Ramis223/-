import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get('/admin/load_clients');
        setClients(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/delete_client/${id}`);
      setClients(clients.filter((client) => client._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center">Загрузка...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Управление клиентами</h2>
      <div className="space-y-4">
        {clients.map((client) => (
          <div key={client._id} className="bg-white p-4 rounded shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">
                  {client.surname} {client.name} {client.patronymic}
                </h3>
                <p className="text-gray-600">Телефон: {client.telephone}</p>
              </div>
              <div className="space-x-2">
                <Link
                  to={`/admin/update-client/${client._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Редактировать
                </Link>
                <button
                  onClick={() => handleDelete(client._id)}
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

export default ManageClients;