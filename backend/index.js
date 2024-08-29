const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./model/user');
const multer = require('multer');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/jobseekers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 
app.use('/uploads', express.static('uploads')); 


// Set storage engine
const storage = multer.diskStorage({
  destination:(res,file,cb)=>{
   cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

// Initialize upload
const upload = multer({
    storage: storage,
   
  })

// Upload and Save User Data
app.post('/api/upload', upload.single('file'),async(req, res) => {
 
    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        about:req.body.about,
        file: req.file.filename, 
      });
      await newUser.save();
      res.status(201).json({ message: 'User and file uploaded successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });


app.listen(5000, () => console.log('Server started on http://localhost:5000'));