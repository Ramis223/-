import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/user/get_orders');
        setOrders(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center">Загрузка...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Мои заказы</h2>
      {orders.length === 0 ? (
        <p>У вас пока нет заказов.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-bold">Заказ #{order._id}</h3>
              <p>Дата: {new Date(order.appointment_date).toLocaleString()}</p>
              <p>Общая стоимость: {order.amount} руб.</p>
              <div>
                <h4 className="font-bold mt-2">Услуги:</h4>
                <ul className="list-disc list-inside">
                  {order.services.map((service) => (
                    <li key={service._id}>{service.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mt-2">Мастер:</h4>
                <p>
                  {order.master.surname} {order.master.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;