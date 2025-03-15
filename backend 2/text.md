    оздание отзыва:

        Метод: POST /reviews/create

        Тело запроса:
        json
        Copy

        {
          "clientId": "клиент_id",
          "masterId": "мастер_id",
          "rating": 5,
          "comment": "Отличный мастер!"
        }

    Получение отзывов для мастера:

        Метод: GET /reviews/master/:masterId

    Удаление отзыва:

        Метод: DELETE /reviews/:reviewId




1. Клиент
Регистрация клиента

POST /user/create
Content-Type: application/json

{
    "name": "Иван",
    "surname": "Иванов",
    "telephone": 1234567890,
    "password": "password123",
    "confirmPassword":"password123"
}

Авторизация клиента 

POST /user/login
Content-Type: application/json

{
    "telephone": 1234567890,
    "password": "password123"
}

Создание заказа 

POST /user/create_order
Authorization: Bearer <token>
{
    "services": ["6543a1b2c3d4e5f6g7h8i9j0"],
    "master": "6543a1b2c3d4e5f6g7h8i9j1",
    "appointment_date": "2023-12-01T10:00:00Z"
}

Получение заказов клиента

GET /user/get_orders
Authorization: Bearer <token>

2. Администратор
Создание мастера 

POST /admin/create_master
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
    "name": "Петр",
    "surname": "Петров",
    "telephone": 9876543210,
    "password": "password456",
    "specialization": "Мойка",
    "picture": <file>
}

Загрузка списка мастеров
http
 
GET /admin/load_masters
Authorization: Bearer <token>

Обновление данных мастера 

PUT /admin/update_master/6543a1b2c3d4e5f6g7h8i9j1
Authorization: Bearer <token>
Content-Type: application/json

{
    "name": "Иван",
    "surname": "Иванов",
    "telephone": 1234567890,
    "specialization": "Полировка"
}

Удаление мастера 

DELETE /admin/delete_master/6543a1b2c3d4e5f6g7h8i9j1
Authorization: Bearer <token>

Создание услуги 

POST /admin/create_service
Authorization: Bearer <token>
Content-Type: application/json

{
    "name": "Полировка",
    "cost": 2000
}

Удаление клиента 

DELETE /admin/delete_client/6543a1b2c3d4e5f6g7h8i9j0
Authorization: Bearer <token>

3. Мастер
Авторизация мастера 

POST /manager/login
Content-Type: application/json

{
    "telephone": 9876543210,
    "password": "password456"
}

Получение списка клиентов мастера 

GET /manager/get_users
Authorization: Bearer <token>

Поиск клиента по фамилии

GET /search-clients-by-surname?surname=Иванов