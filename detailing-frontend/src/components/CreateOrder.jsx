import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

const CreateOrder = () => {
  const [services, setServices] = useState([]);
  const [masters, setMasters] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedMaster, setSelectedMaster] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await api.get('/admin/load_services');
        const mastersResponse = await api.get('/admin/load_masters');
        setServices(servicesResponse.data);
        setMasters(mastersResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/create_order', {
        services: selectedServices,
        master: selectedMaster,
        appointment_date: appointmentDate,
      });
      alert('Заказ успешно создан!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Создать заказ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Выберите услуги</label>
          {services.map((service) => (
            <div key={service._id} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={service._id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedServices([...selectedServices, service._id]);
                  } else {
                    setSelectedServices(selectedServices.filter((id) => id !== service._id));
                  }
                }}
                className="mr-2"
              />
              <span>{service.name} - {service.cost} руб.</span>
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Выберите мастера</label>
          <select
            value={selectedMaster}
            onChange={(e) => setSelectedMaster(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Выберите мастера</option>
            {masters.map((master) => (
              <option key={master._id} value={master._id}>
                {master.surname} {master.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Дата и время</label>
          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Создать заказ
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;