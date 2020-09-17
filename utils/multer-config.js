const multer = require('multer');
const ValidationError = require('../errors/validation-err');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    return cb(null, true);
  }

  return cb(new ValidationError('Неверный формат файла. Допустимы изображения jpeg либо png.'));
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter,
  fileSize: 1024 * 1024 * 5,
});

module.exports = {
  upload,
};
