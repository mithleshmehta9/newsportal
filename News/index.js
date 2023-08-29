const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { urlencoded, json } = bodyParser;
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const dbconn = require('./config/config');
const Image = require("./models/image");

// Port configuration
const port = 4600;


//MAKING USE OF BODY_PARSER
app.use(urlencoded({ extended: false })); // parse request data content
app.use(json()); // parse request data content type aplication/json


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//MAKING USE OF CORS
app.use(
  cors({
    origin: "*",
    methods: ['GET', 'POST', 'UPDATE', 'PUT', 'PATCH', 'DELETE']
  })
);

//DEFINING ROOT ROUTE
app.get('/', (_req, res) => {
  res.send("API connected successfully.");
});

const signup = require('./src/routes/signup.route');
app.use('/signup', signup);

const login = require('./src/routes/login.route');
app.use('/login', login);

const news = require('./src/routes/news.route');
app.use('/news', news);

const post = require('./src/routes/userpost.route')
app.use('/post', post);

const edunews = require('./src/routes/edunotice.route')
app.use('/edunews', edunews)

const admin = require('./src/routes/admin.route')
app.use('/admin', admin)

const product = require('./src/routes/product.route')
app.use('/product', product)

const likeRoutes = require('./src/routes/like.route');
app.use('/like', likeRoutes);





// // Multer storage configuration for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // The folder where uploaded files will be stored
//   },
//   filename: function (req, file, cb) {
//     // Generate a unique file name to avoid naming conflicts
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Serve static files from the 'uploads' directory
// const absoluteUploadsPath = path.join(__dirname, "uploads");
// app.use('/uploads', express.static(absoluteUploadsPath));

// const upload = multer({ storage: storage });

// // Define the route to handle file uploads (as in the previous code)
// app.post('/upload', upload.single('file'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   // Access the file details through req.file
//   console.log('File uploaded:', req.file);

//   // Save the image URL in the database
//   const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
//   try {
//     // Save the image URL to the MySQL database
//     //const sql = "INSERT INTO images (url) VALUES (?)";
//     const sql = `UPDATE ${req.tableName} SET ${req.columnName} = '${req.value1}' WHERE ${req.condition} = ${req.value2}`
//     dbconn.query(sql, [imageUrl], (error, result) => {
//       if (error) {
//         console.error('Error saving image URL to the database:', error);
//         res.status(500).send('Internal Server Error');
//       } else {
//         console.log('Image URL saved to the database:', imageUrl);
//         res.status(200).json({ imageUrl });
//       }
//     });
//   } catch (error) {
//     console.error('Error saving image URL to the database:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.use(express.static('src'));
app.use('/images', express.static('files'));

const fileUpload = require('./src/routes/file.upload.route');
app.use('/upload', fileUpload);

