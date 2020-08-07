# **Основы бэкэнда. Спринт 13**

## **Версия** 0.0.3

## **Описание**
В данной работе выполнены задания по темам "Создание API. REST" и "Базы данных"

## **Описание API**
- запрос `GET /users` возвращает всех пользователей из базы;
- запрос `GET /users/:userId` возвращает конкретного пользователя;
- запрос `POST /users` создаёт пользователя;
- запрос `GET /cards` возвращает все карточки всех пользователей;
- запрос `POST /cards` создаёт карточку;
- запрос `PATCH /users/me` обновляет профиль
- запрос `PATCH /users/me/avatar` обновляет аватар
- запрос `PUT /cards/:cardId/likes` поставить лайк карточке
- запрос `DELETE /cards/:cardId/likes` убрать лайк с карточки

## **Стэк технологий** 
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/ru/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Nodemon](https://www.npmjs.com/package/nodemon/)
- [ESLint](https://eslint.org/)

## **Установка**
- Скачать репозиторий и установить зависимости - `$ npm install`
- Запустить сервер на http://localhost:3000 - `$ npm run start`
- Запустить сервер с "горячей" перезагрузкой: http://localhost:3000 - `$ npm run dev`
