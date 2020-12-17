

const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
      cb(null, `user-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
  })

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  };
   
  exports.upload = multer({ storage, fileFilter });