// Importamos los módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const router = express.Router();

// Configuración de multer para manejar las imágenes subidas
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});

const upload = multer({ storage });

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Definimos el esquema y modelo de producto
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { collection: 'products', timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Ruta para agregar un nuevo producto
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No image uploaded' });
    }

    const { name, price, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ status: 'error', message: 'Product name, price, and category are required' });
    }

    const newProduct = new Product({
      name,
      price: parseFloat(price),
      category,
      imageUrl: `http://localhost:4000/uploads/${req.file.filename}`
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ status: 'success', message: 'Product created', product: savedProduct });

  } catch (error) {
    console.error('Error processing product:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

module.exports = router;
