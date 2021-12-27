const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add-products-seller', (req, res) => {
    res.render('products-seller/add-products-seller');
});

router.post('/add-products-seller', async (req, res) => {
    
    const { name, description, price } = req.body;
    const newProduct = {
        name,
        description,
        price
    };
    await pool.query('INSERT INTO products set ?', [newProduct]);
    req.flash('success', 'Producto agregado correctamente');
    res.redirect('/products-seller');
});


router.get('/', async (req, res) => {
    const products = await pool.query('SELECT * FROM products', function (err, result, fields) {
        if (err) throw err;
        res.render('products-seller/products', {result});
    });    
});

router.get('/delete-products-seller/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE ID = ?', [id]);
    res.redirect('/products-seller');
});

router.get('/edit-products-seller/:id', async (req, res) => {
    const { id } = req.params;
    const products = await pool.query('SELECT * FROM products WHERE id = ?', [id], function (err, result, fields) {
    if (err) throw err;
    res.render('products-seller/edit-products-seller', {result: result[0]});
    });  
});

router.post('/edit-products-seller/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const newProduct = {
        name,
        description,
        price
    };
    console.log(newProduct);
    await pool.query('UPDATE products set ? WHERE id = ?', [newProduct, id]);
    res.redirect('/products-seller');
});

module.exports = router;
