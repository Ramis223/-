import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

const Profile = () => {
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [telephone, setTelephone] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Режим редактирования
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Состояния для смены пароля
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false); // Режим смены пароля

  // Загружаем данные пользователя при открытии профиля
  useEffect(() => {
    if (user) {
      setName(user.name);
      setSurname(user.surname);
      setPatronymic(user.patronymic || '');
      setTelephone(user.telephone);
    }
  }, [user]);

  // Обработчик для сохранения изменений профиля
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/user/update/${user._id}`, {
        name,
        surname,
        patronymic,
        telephone,
      });
      setUser(response.data); // Обновляем данные пользователя в Zustand
      setSuccess('Данные успешно обновлены');
      setError('');
      setIsEditing(false); // Выходим из режима редактирования
    } catch (err) {
      setError(err.response?.data?.msg || 'Ошибка при обновлении данных');
      setSuccess('');
    }
  };

  // Обработчик для смены пароля
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('Новый пароль и подтверждение не совпадают');
      return;
    }

    try {
      const response = await api.put(`/user/change-password/${user._id}`, {
        currentPassword,
        newPassword,
      });
      setSuccess(response.data.msg);
      setError('');
      setIsChangingPassword(false); // Выходим из режима смены пароля
    } catch (err) {
      setError(err.response?.data?.msg || 'Ошибка при смене пароля');
      setSuccess('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Профиль</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {/* Режим просмотра профиля */}
      {!isEditing && !isChangingPassword && (
        <div className="space-y-4">
          <div>
            <p className="text-gray-700">
              <span className="font-bold">Имя:</span> {user?.name}
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-bold">Фамилия:</span> {user?.surname}
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-bold">Отчество:</span> {user?.patronymic || 'Не указано'}
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-bold">Телефон:</span> {user?.telephone}
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Изменить данные
            </button>
            <button
              onClick={() => setIsChangingPassword(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Сменить пароль
            </button>
          </div>
        </div>
      )}

      {/* Режим редактирования профиля */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="space-y-4">
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
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Сохранить изменения
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Отмена
            </button>
          </div>
        </form>
      )}

      {/* Режим смены пароля */}
      {isChangingPassword && (
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Текущий пароль</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Новый пароль</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Подтвердите новый пароль</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Сменить пароль
            </button>
            <button
              onClick={() => setIsChangingPassword(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Отмена
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;