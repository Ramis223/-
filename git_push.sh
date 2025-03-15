#!/bin/bash

echo "Добавляю файлы в индексацию..."
git add .

echo "Фиксируем изменения..."
git commit -m "Autcommit"

echo "Отпроавляем на удаленный репозиторий..."
git push origin "$1"
echo "Готова!"