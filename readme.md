# **Основы бэкэнда. Спринт 15**

## **Версия** 0.0.9

## **Превью**
Публичный ip [84.201.141.83](84.201.141.83)

Домен [http://api.mesto-app.ga/](http://api.mesto-app.ga/)

## **Описание**
В данной работе выполнены задания по темам:
- Серверная разработка на Node.js
- Введение в Express.js
- Создание API. REST
- Базы данных
- Аутентификация и авторизация
- Безопасность веб приложений
- Подготовка и деплой бэкэнда 

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
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Validator](https://www.npmjs.com/package/validator)
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)
- [Helmet](https://www.npmjs.com/package/helmet)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [celebrate](https://www.npmjs.com/package/celebrate)
- [winston](https://www.npmjs.com/package/winston)
- [express-winston](https://www.npmjs.com/package/express-winston)
- [ESLint](https://eslint.org/)

## **Установка**
- Скачать репозиторий и установить зависимости - `$ npm install`
- Запустить сервер на http://localhost:3000 - `$ npm run start`
- Запустить сервер с "горячей" перезагрузкой http://localhost:3000 - `$ npm run dev`
