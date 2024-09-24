const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: './logs',
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000000000 },
}).single('file');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400);
    }

    res.sendStatus(200);
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
