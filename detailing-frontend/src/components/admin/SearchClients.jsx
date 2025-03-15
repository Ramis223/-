import React, { useState } from 'react';
import api from '../../api/axios';

const SearchClients = () => {
  const [surname, setSurname] = useState('');
  const [clients, setClients] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await api.get(`/admin/search-clients-by-surname?surname=${surname}`);
      setClients(response.data.clients);
    } catch (err) {
      setError(err.response?.data?.msg || 'Ошибка при поиске клиентов');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Поиск клиентов по фамилии</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Введите фамилию"
          className="w-full px-3 py-2 border rounded"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
          Найти
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {clients.length > 0 ? (
        <div className="space-y-4">
          {clients.map((client) => (
            <div key={client._id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-bold">
                {client.surname} {client.name} {client.patronymic}
              </h3>
              <p className="text-gray-600">Телефон: {client.telephone}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Клиенты не найдены.</p>
      )}
    </div>
  );
};

export default SearchClients;