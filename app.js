const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { celebrate } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const users = require('./routes/users.js');
const cards = require('./routes/cards.js');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const errorHandler = require('./middlewares/error');
const {
  loginSchema,
  // createUserSchema,
  // authSchema, //no joi validation for cookie
} = require('./utils/validation-schemes');
const { upload } = require('./utils/multer-config');
const optimize = require('./middlewares/optimize');

require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
const corsOptions = {
  origin: process.env.ALLOWED_CORS.split(' '),
  credentials: true,
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(requestLogger);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/signin', celebrate(loginSchema), login);
// app.post('/signup', celebrate(createUserSchema), createUser); //route for signup with avatar link
app.post('/signup', upload.single('file'), optimize, createUser);
app.use('/cards', cards);
// app.use(celebrate(authSchema), auth); // no joi validation for cookie
app.use(auth);
app.use('/users', users);
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
