const multer = require('multer');

module.exports = {
    multerMiddleware: multer({ dest: 'public/images/brands/' })
}