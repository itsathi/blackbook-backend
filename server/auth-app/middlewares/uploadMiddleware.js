const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'coverImage') {
      cb(null, 'uploads/covers/');
    } else {
      cb(null, 'uploads/files/');
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});

const upload = multer({ storage });

exports.productUploader = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'productFile', maxCount: 1 }
]);

