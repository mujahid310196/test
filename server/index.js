const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    
});

app.get('/products', async (req, res) => {
    const sql = 'SELECT * FROM products ORDER BY product_id DESC';
    try{
        const [products] = await db.query(sql);
        res.json(products);
    }catch(err){
        console.log(err);
    }
    
});

app.post('/add-product', async (req, res) => {
    const product = req.body;
    const sql = 'INSERT INTO products SET ?';
    try{
        const [result] = await db.query(sql, product);
        res.json(result);
        console.log(result);
    }catch(err){
        console.log(err);
    }
});

app.put('/edit-product/:id', async (req, res) => {
    const id = req.params.id;
    const product = req.body;
    const sql = 'UPDATE products SET ? WHERE product_id = ?';
    try{
        const [result] = await db.query(sql, [product, product.product_id]);
        res.json(result);
        //console.log(result);
    }catch(err){
        console.log(err);
    }
});

app.delete('/delete-product/:id', async(req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM products WHERE product_id = ?';
    try{
        const [result] = await db.query(sql, id);
        res.json(result);
        //console.log(result);
    }catch(err){
        console.log(err);
    }
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});