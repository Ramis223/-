import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Car Service</h1>
        <div className="flex items-center space-x-4">
          <Link to="/masters" className="hover:text-gray-200">
            Мастера
          </Link>
          <Link to="/services" className="hover:text-gray-200">
            Услуги
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:text-gray-200">
                Профиль
              </Link>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin/masters" className="hover:text-gray-200">
                    Управление мастерами
                  </Link>
                  <Link to="/admin/services" className="hover:text-gray-200">
                    Управление услугами
                  </Link>
                  <Link to="/admin/clients" className="hover:text-gray-200">
                    Управление клиентами
                  </Link>
                  <Link to="/admin/orders" className="hover:text-gray-200">
                    Все заказы
                  </Link>
                  <Link to="/admin/search-clients" className="hover:text-gray-200">
                    Поиск клиентов
                  </Link>
                </>
              )}
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
                Выйти
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-200">
              Войти
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;