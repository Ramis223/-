import Client from '../model/client.mjs';
import Service from '../model/service.mjs';
import Master from '../model/master.mjs';
import Order from '../model/order.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class ClientController {
    static async create(req, res) {
        try {
            const { name, surname, patronymic, telephone, password, confirmPassword } = req.body;

            // Проверка совпадения паролей
            if (password !== confirmPassword) {
                return res.status(400).json({ msg: 'Пароли не совпадают' });
            }

            // Валидация ФИО
            const validateName = (value) => /^[А-ЯЁ][а-яё]+$/.test(value);
            if (!validateName(name)) {
                return res.status(400).json({ msg: 'Имя должно быть на кириллице и начинаться с заглавной буквы' });
            }
            if (!validateName(surname)) {
                return res.status(400).json({ msg: 'Фамилия должна быть на кириллице и начинаться с заглавной буквы' });
            }
            if (patronymic && !validateName(patronymic)) {
                return res.status(400).json({ msg: 'Отчество должно быть на кириллице и начинаться с заглавной буквы' });
            }

            // Валидация номера телефона
            if (!/^\d{11}$/.test(telephone)) {
                return res.status(400).json({ msg: 'Номер телефона должен состоять из 11 цифр' });
            }

            // Валидация пароля
            const validatePassword = (value) => {
                const minLength = 4;
                const specialChars = /[!@#$%^&*]/;
                return value.length >= minLength && specialChars.test(value);
            };
            if (!validatePassword(password)) {
                return res.status(400).json({ msg: 'Пароль должен состоять из минимум 4 символов и содержать хотя бы один из специальных символов: @, $, &' });
            }

            // Хеширование пароля
            const hashed = await bcrypt.hash(password, 5);

            // Создание клиента
            const client = new Client({
                name,
                surname,
                patronymic,
                telephone,
                password: hashed,
                picture: req.file.filename,
            });

            await client.save();
            res.status(201).json({ msg: 'Клиент создан' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { telephone, password } = req.body;
            const client = await Client.findOne({ telephone });
            if (!client) {
                return res.status(404).json({ msg: 'Клиент не найден' });
            }
            const isValidPassword = await bcrypt.compare(password, client.password);
            if (!isValidPassword) {
                return res.status(404).json({ msg: 'Неверный пароль' });
            }
            const token = jwt.sign({ _id: client._id, telephone: client.telephone }, process.env.SECRET, { expiresIn: '10h' });
            return res.status(200).json({ token, client: { _id: client._id, telephone: client.telephone } });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static async createOrder(req, res) {
        const clientId = req.user._id;
        try {
            const { services, master, appointment_date } = req.body;

            // Проверка, что массив услуг не пустой
            if (!services || !Array.isArray(services) || services.length === 0) {
                return res.status(400).json({ msg: 'Необходимо выбрать хотя бы одну услугу' });
            }

            // Получение стоимости каждой услуги
            const serviceCosts = await Promise.all(services.map(serviceId => Service.findById(serviceId)));

            // Проверка, что все услуги существуют
            const invalidServices = serviceCosts.filter(service => !service);
            if (invalidServices.length > 0) {
                return res.status(400).json({ msg: 'Некоторые услуги не найдены' });
            }

            // Расчет общей стоимости
            const totalAmount = serviceCosts.reduce((sum, service) => sum + service.cost, 0);

            // Создание заказа
            const newOrder = new Order({
                client: clientId,
                amount: totalAmount,
                services,
                master,
                appointment_date,
            });

            await newOrder.save();
            return res.status(201).json({ msg: 'Заказ успешно создан', order: newOrder });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static async getOrders(req, res) {
        const clientId = req.user._id;
        try {
            const orders = await Order.find({ client: clientId }).populate('services').populate('master');
            res.json(orders);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
}