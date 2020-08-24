# **Основы бэкэнда. Спринт 13**

## **Версия** 0.0.4

## **Описание**
В данной работе выполнены задания по темам:
- Серверная разработка на Node.js
- Введение в Express.js
- Создание API. REST
- Базы данных

## **Описание API**
- `GET /users` - возвращает всех пользователей из базы
- `GET /users/:userId` - возвращает конкретного пользователя
- `POST /users` - создаёт пользователя
- `PATCH /users/me` - обновляет профиль
- `PATCH /users/me/avatar` - обновляет аватар
- `GET /cards` - возвращает все карточки всех пользователей
- `POST /cards` - создаёт карточку
- `DELETE /cards/:cardId` — удаляет карточку по _id
- `PUT /cards/:cardId/likes` - поставить лайк карточке
- `DELETE /cards/:cardId/likes` - убрать лайк с карточки

## **Стэк технологий** 
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/ru/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Nodemon](https://www.npmjs.com/package/nodemon/)
- [Validator](https://www.npmjs.com/package/validator)
- [ESLint](https://eslint.org/)

## **Установка**
- Скачать репозиторий и установить зависимости - `$ npm install`
- Запустить сервер на http://localhost:3000 - `$ npm run start`
- Запустить сервер с "горячей" перезагрузкой http://localhost:3000 - `$ npm run dev`
