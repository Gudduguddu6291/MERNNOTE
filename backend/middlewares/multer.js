// import multer from 'multer';

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public');
//   },
//   filename: function (req, file, cb) {
//     cb(null,  file.originalname);
//   }
// });

// let uploadm = multer({ storage: storage });

// export default uploadm;

import multer from 'multer';
import path from 'path';

// Store files temporarily in ./public/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public'); // temp storage
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const uploadm = multer({ 
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'));
    }
  }
});

export default uploadm;
