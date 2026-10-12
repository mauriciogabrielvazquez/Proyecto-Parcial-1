// app.test.js
const request = require('supertest');
const app = require('./app');

describe('Pruebas de API - Usuarios y Productos', () => {

    // ==========================================
    // --- PRUEBAS DE USERS ---
    // ==========================================
    describe('Endpoints de Users', () => {
        
        // 1. GET ALL (Simple: 1 caso)
        it('GET /api/users - Debería obtener todos los usuarios', async () => {
            const res = await request(app).get('/api/users');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
        });

        // 2. GET BY ID (Medio: 2 casos)
        it('GET /api/users/:id - Éxito: Debería obtener un usuario específico', async () => {
            const res = await request(app).get('/api/users/1');
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBeDefined();
        });

        it('GET /api/users/:id - Error: ID inexistente devuelve 404', async () => {
            const res = await request(app).get('/api/users/999');
            expect(res.statusCode).toBe(404);
        });

        // 3. POST (Complejo: 3 casos)
        it('POST /api/users - Éxito: Crea un usuario correctamente', async () => {
            const res = await request(app).post('/api/users').send({ name: 'Carlos' });
            expect(res.statusCode).toBe(201);
            expect(res.body.name).toBe('Carlos');
        });

        it('POST /api/users - Error: Falla al no enviar cuerpo de la petición (vacío)', async () => {
            const res = await request(app).post('/api/users').send({});
            expect(res.statusCode).toBe(400);
        });

        it('POST /api/users - Error: Falla si el nombre es un string vacío o números', async () => {
            const res = await request(app).post('/api/users').send({ name: "" }); // String vacío
            expect(res.statusCode).toBe(400);
        });

        // 4. PUT (Complejo: 3 casos)
        it('PUT /api/users/:id - Éxito: Actualiza un usuario correctamente', async () => {
            const res = await request(app).put('/api/users/1').send({ name: 'Mauricio Actualizado' });
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe('Mauricio Actualizado');
        });

        it('PUT /api/users/:id - Error: Intenta actualizar un usuario que no existe', async () => {
            const res = await request(app).put('/api/users/999').send({ name: 'Fantasma' });
            expect(res.statusCode).toBe(404);
        });

        it('PUT /api/users/:id - Error: Intenta actualizar enviando un tipo de dato incorrecto', async () => {
            const res = await request(app).put('/api/users/1').send({ name: 12345 }); // Número en vez de string
            expect(res.statusCode).toBe(400);
        });

        // 5. DELETE (Medio: 2 casos)
        it('DELETE /api/users/:id - Éxito: Elimina un usuario', async () => {
            const res = await request(app).delete('/api/users/1');
            expect(res.statusCode).toBe(204);
        });

        it('DELETE /api/users/:id - Error: Falla al intentar borrar un ID que no existe', async () => {
            const res = await request(app).delete('/api/users/999');
            expect(res.statusCode).toBe(404);
        });
    });

    // ==========================================
    // --- PRUEBAS DE PRODUCTS ---
    // ==========================================
    describe('Endpoints de Products', () => {
        
        // 6. GET ALL (Simple: 1 caso)
        it('GET /api/products - Debería obtener productos', async () => {
            const res = await request(app).get('/api/products');
            expect(res.statusCode).toBe(200);
        });

        // 7. GET BY ID (Medio: 2 casos)
        it('GET /api/products/:id - Éxito: Obtiene producto específico', async () => {
            const res = await request(app).get('/api/products/1');
            expect(res.statusCode).toBe(200);
        });

        it('GET /api/products/:id - Error: Producto inexistente', async () => {
            const res = await request(app).get('/api/products/999');
            expect(res.statusCode).toBe(404);
        });

        // 8. POST (Muy complejo: 3 casos explorando el problema del precio)
        it('POST /api/products - Éxito: Crea un producto correctamente', async () => {
            const res = await request(app).post('/api/products').send({ name: 'Teclado', price: 500 });
            expect(res.statusCode).toBe(201);
            expect(res.body.price).toBe(500);
        });

        it('POST /api/products - Error: Falla si faltan datos o van vacíos', async () => {
            const res = await request(app).post('/api/products').send({ name: '', price: null });
            expect(res.statusCode).toBe(400);
        });

        it('POST /api/products - Error: Falla con precios inválidos (letras, negativos o texto con números)', async () => {
            // Evaluamos varias entradas erróneas que el usuario podría intentar
            const invalidPrices = ["100 USD", "cien", -50, 0]; 
            
            for (const price of invalidPrices) {
                const res = await request(app).post('/api/products').send({ name: 'Mouse', price: price });
                expect(res.statusCode).toBe(400);
            }
        });

        // 9. PATCH (Complejo: 3 casos)
        it('PATCH /api/products/:id - Éxito: Actualiza solo el precio del producto', async () => {
            const res = await request(app).patch('/api/products/1').send({ price: 12000 });
            expect(res.statusCode).toBe(200);
            expect(res.body.price).toBe(12000);
        });

        it('PATCH /api/products/:id - Error: Producto inexistente', async () => {
            const res = await request(app).patch('/api/products/999').send({ price: 100 });
            expect(res.statusCode).toBe(404);
        });

        it('PATCH /api/products/:id - Error: Intenta actualizar precio con un tipo de dato incorrecto (string)', async () => {
            const res = await request(app).patch('/api/products/1').send({ price: "gratis" });
            expect(res.statusCode).toBe(400);
        });

        // 10. DELETE (Medio: 2 casos)
        it('DELETE /api/products/:id - Éxito: Elimina el producto', async () => {
            const res = await request(app).delete('/api/products/1');
            expect(res.statusCode).toBe(204);
        });

        it('DELETE /api/products/:id - Error: Intentar borrar un producto ya eliminado', async () => {
            const res = await request(app).delete('/api/products/1'); // Ya se borró en la prueba anterior
            expect(res.statusCode).toBe(404);
        });
    });
});