import Service from '../model/service.mjs';
import Master from '../model/master.mjs';
import Client from '../model/client.mjs';
import Order from '../model/order.mjs'; // Добавлен импорт Order
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { body, validationResult } from 'express-validator';

configDotenv();

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 5);
};

export default class AdminController {
    // Создание мастера
    static async createMaster(req, res) {
        try {
            // Проверка роли пользователя
            if (req.user.role !== 'admin') {
                return res.status(403).json({ msg: 'Доступ запрещён. Требуются права администратора.' });
            }

            const { name, surname, patronymic, telephone, password, specialization } = req.body;

            // Валидация данных
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Хеширование пароля
            const hashed = await hashPassword(password);

            // Создание мастера
            const master = new Master({
                name,
                surname,
                patronymic,
                telephone,
                password: hashed,
                specialization,
                picture: req.file.filename,
            });

            await master.save();
            res.status(201).json({ msg: 'Мастер создан' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    // Получение списка мастеров
    static async loadMasters(req, res) {
        try {
            const masters = await Master.find();
            res.json(masters);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    // Обновление мастера
    static async updateMaster(req, res) {
        try {
            // Проверка роли пользователя
            if (req.user.role !== 'admin') {
                return res.status(403).json({ msg: 'Доступ запрещён. Требуются права администратора.' });
            }

            const { id } = req.params;
            const { name, surname, patronymic, telephone, specialization, password } = req.body;

            // Найти мастера по ID
            const master = await Master.findById(id);
            if (!master) {
                return res.status(404).json({ msg: 'Мастер не найден' });
            }

            // Валидация данных
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Обновление данных мастера
            if (name) master.name = name;
            if (surname) master.surname = surname;
            if (patronymic) master.patronymic = patronymic;
            if (telephone) master.telephone = telephone;
            if (specialization) master.specialization = specialization;

            // Обновление пароля, если он предоставлен
            if (password) {
                const hashed = await hashPassword(password);
                master.password = hashed;
            }

            await master.save();
            return res.status(200).json({ msg: 'Данные мастера обновлены' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    // Удаление мастера
    static async deleteMaster(req, res) {
        try {
            // Проверка роли пользователя
            if (req.user.role !== 'admin') {
                return res.status(403).json({ msg: 'Доступ запрещён. Требуются права администратора.' });
            }

            const { id } = req.params;
            await Master.findByIdAndDelete(id);
            return res.status(200).json({ msg: 'Мастер удалён' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    // Создание услуги
    static async createService(req, res) {
        try {
            // Проверка роли пользователя
            if (req.user.role !== 'admin') {
                return res.status(403).json({ msg: 'Доступ запрещён. Требуются права администратора.' });
            }

            const { name, cost } = req.body;

            // Валидация данных
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Создание услуги
            const service = new Service({
                name,
                cost,
                picture: req.file.filename,
            });

            await service.save();
            res.status(201).json({ msg: 'Услуга создана' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    // Обновление услуги
    static async updateService(req, res) {
        try {
            // Проверка роли пользователя
            if (req.user.role !== 'admin') {
                return res.status(403).json({ msg: 'Доступ запрещён. Требуются права администратора.' });
            }

            const { id } = req.params;
            const { name, cost } = req.body;

            // Найти услугу по ID
            const service = await Service.findById(id);
            if (!service) {
                return res.status(404).json({ msg: 'Услуга не найдена' });
            }

            // Валидация данных
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Обновление данных услуги
            if (name) service.name = name;
            if (cost) service.cost = cost;

            await service.save();
            return res.status(200).json({ msg: 'Данные услуги обновлены' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    // Удаление клиента
    static async deleteClient(req, res) {
        try {
            // Проверка роли пользователя
            if (req.user.role !== 'admin') {
                return res.status(403).json({ msg: 'Доступ запрещён. Требуются права администратора.' });
            }

            const { id } = req.params;

            // Проверка наличия заказов у клиента
            const orders = await Order.find({ client: id });
            if (orders.length > 0) {
                return res.status(400).json({ msg: 'Невозможно удалить клиента, у которого есть заказы' });
            }

            await Client.findByIdAndDelete(id);
            return res.status(200).json({ msg: 'Клиент удалён' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    // Вход в систему
    static async login(req, res) {
        try {
            const { telephone, password } = req.body;

            // Найти менеджера по номеру телефона
            const manager = await Master.findOne({ telephone });
            if (!manager) {
                return res.status(404).json({ msg: 'Менеджер не найден' });
            }

            // Проверка пароля
            const isValidPassword = await bcrypt.compare(password, manager.password);
            if (!isValidPassword) {
                return res.status(401).json({ msg: 'Неверный пароль' });
            }

            // Создание JWT токена
            const token = jwt.sign(
                { _id: manager._id, telephone: manager.telephone, role: manager.role },
                process.env.SECRET,
                { expiresIn: '10h' }
            );

            // Возвращаем токен и данные менеджера
            return res.status(200).json({
                token,
                manager: {
                    _id: manager._id,
                    name: manager.name,
                    surname: manager.surname,
                    telephone: manager.telephone,
                    role: manager.role,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    // Поиск клиентов по фамилии
    static async searchClientsBySurname(req, res) {
        try {
            const { surname, page = 1, limit = 10 } = req.query;

            // Проверка, что фамилия передана
            if (!surname) {
                return res.status(400).json({ msg: 'Фамилия не указана' });
            }

            // Преобразуем page и limit в числа
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);

            // Поиск клиентов по фамилии с пагинацией
            const clients = await Client.find({ surname: { $regex: new RegExp(surname, 'i') } })
                .limit(limitNumber) // Ограничиваем количество результатов
                .skip((pageNumber - 1) * limitNumber); // Пропускаем результаты для пагинации

            if (clients.length === 0) {
                return res.status(404).json({ msg: 'Клиенты с такой фамилией не найдены' });
            }

            return res.status(200).json({ clients });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
}