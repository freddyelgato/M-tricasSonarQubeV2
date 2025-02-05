const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const router = express.Router();

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Definimos el esquema y modelo de producto
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true }
}, { collection: 'products', timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Manejo de respuestas estándar
const handleResponse = (res, status, message, data = null) => {
    const response = { status, message };
    if (data) response.products = data;
    res.status(status === 'success' ? 200 : 500).json(response);
};

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        handleResponse(res, 'success', 'Products retrieved successfully', products);
    } catch (err) {
        console.error(err);
        handleResponse(res, 'error', 'Error retrieving products');
    }
});

// Ruta para buscar productos
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return handleResponse(res, 'error', 'Query parameter is required');

        const products = await Product.find({
            name: { $regex: query, $options: 'i' } // Búsqueda insensible a mayúsculas
        });
        handleResponse(res, 'success', 'Search completed successfully', products);
    } catch (err) {
        console.error(err);
        handleResponse(res, 'error', 'Error searching for products');
    }
});

module.exports = router;
