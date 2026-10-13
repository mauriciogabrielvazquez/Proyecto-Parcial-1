// app.js
const express = require('express');
const app = express();
app.use(express.json());

// --- BASE DE DATOS EN MEMORIA ---
let users = [{ id: 1, name: 'Mauricio' }];
let products = [{ id: 1, name: 'Laptop', price: 15000 }];

// ==========================================
// RECURSO 1: USERS (5 Endpoints)
// ==========================================

// ==========================================
// ENDPOINT DE COMPROBACIÓN
// ==========================================
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'La API está funcionando correctamente en el servidor' 
    });
});

// 1. GET ALL
app.get('/api/users', (req, res) => res.json(users));

// 2. GET BY ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
});

// 3. POST
app.post('/api/users', (req, res) => {
    if (!req.body.name) return res.status(400).json({ error: 'El nombre es obligatorio' });
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 4. PUT
// 4. PUT
    app.put('/api/users/:id', (req, res) => {
        const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        
        // --- AQUÍ ESTÁ LA SOLUCIÓN ---
        // Verificamos que exista, que sea texto (string) y que no esté vacío
        if (!req.body.name || typeof req.body.name !== 'string' || req.body.name.trim() === '') {
            return res.status(400).json({ error: 'El nombre es obligatorio y debe ser un texto válido' });
        }
        
        user.name = req.body.name;
        res.json(user);
    });

// 5. DELETE
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ error: 'Usuario no encontrado' });
    
    users.splice(userIndex, 1);
    res.status(204).send();
});

// ==========================================
// RECURSO 2: PRODUCTS (5 Endpoints)
// ==========================================

// 6. GET ALL
app.get('/api/products', (req, res) => res.json(products));

// 7. GET BY ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
});

// 8. POST
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;

    if (!name || name.trim() === '') return res.status(400).json({ error: 'Nombre inválido' });
    if (typeof price !== 'number' || price <= 0) return res.status(400).json({ error: 'Precio inválido' });
    
    const newProduct = { id: products.length + 1, name: req.body.name, price: req.body.price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// 9. PATCH (Update parcial)
app.patch('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    
    if (req.body.price && typeof req.body.price !== 'number') {
        return res.status(400).json({ error: 'El precio debe ser un número' });
    }

    if (req.body.name) product.name = req.body.name;
    if (req.body.price) product.price = req.body.price;
    res.json(product);
});

// 10. DELETE
app.delete('/api/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).json({ error: 'Producto no encontrado' });
    
    products.splice(productIndex, 1);
    res.status(204).send();
});

module.exports = app; // Exportamos sin hacer app.listen() para que Jest lo pueda probar