const { diskStorage } = require('multer');
const { resolve } =  require('path');

module.exports = {
  storage: diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      return callback(null, file.originalname);
    },
  }),
};