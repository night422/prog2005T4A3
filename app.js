// app.js (Node.js API with MySQL)
const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers/controller'); // Import the controller

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// --- Category Routes ---
app.get('/categories', controller.getCategories);
app.post('/categories', controller.addCategory);
app.put('/categories/:id', controller.updateCategory);
app.delete('/categories/:id', controller.deleteCategory);

// --- Donation Routes ---
app.get('/donations', controller.getDonations);
app.post('/donations', controller.addDonation);
app.put('/donations/:id', controller.updateDonation);
app.delete('/donations/:id', controller.deleteDonation);

// --- Fundraiser Routes ---
app.get('/fundraisers', controller.getFundraisers);
app.post('/fundraisers', controller.addFundraiser);
app.put('/fundraisers/:id', controller.updateFundraiser);
app.delete('/fundraisers/:id', controller.deleteFundraiser);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'password', // Your MySQL password
    database: 'user_management' // Replace with your actual database name
});

// Establish connection to MySQL database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// --- Category Management ---

// Get all categories
app.get('/categories', (req, res) => {
    db.query('SELECT * FROM category', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new category
app.post('/categories', (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO category (NAME) VALUES (?)';
    db.query(query, [name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Category added successfully', categoryId: result.insertId });
    });
});

// Update a category
app.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = 'UPDATE category SET NAME = ? WHERE CATEGORY_ID = ?';
    db.query(query, [name, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Category updated successfully' });
    });
});

// Delete a category
app.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM category WHERE CATEGORY_ID = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Category deleted successfully' });
    });
});

// --- Donation Management ---

// Get all donations
app.get('/donations', (req, res) => {
    db.query('SELECT * FROM donation', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new donation
app.post('/donations', (req, res) => {
    const { date, amount, giver, fundraiserId } = req.body;
    const query = 'INSERT INTO donation (`DATE`, AMOUNT, GIVER, FUNDRAISER_ID) VALUES (?, ?, ?, ?)';
    db.query(query, [date, amount, giver, fundraiserId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Donation added successfully', donationId: result.insertId });
    });
});

// Update a donation
app.put('/donations/:id', (req, res) => {
    const { id } = req.params;
    const { date, amount, giver, fundraiserId } = req.body;
    const query = 'UPDATE donation SET `DATE` = ?, AMOUNT = ?, GIVER = ?, FUNDRAISER_ID = ? WHERE DONATION_ID = ?';
    db.query(query, [date, amount, giver, fundraiserId, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Donation updated successfully' });
    });
});

// Delete a donation
app.delete('/donations/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM donation WHERE DONATION_ID = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Donation deleted successfully' });
    });
});

// --- Fundraiser Management ---

// Get all fundraisers
app.get('/fundraisers', (req, res) => {
    db.query('SELECT * FROM fundraiser', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new fundraiser
app.post('/fundraisers', (req, res) => {
    const { organizer, caption, targetFunding, currentFunding, city, active, categoryId } = req.body;
    const query = 'INSERT INTO fundraiser (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [organizer, caption, targetFunding, currentFunding, city, active, categoryId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Fundraiser added successfully', fundraiserId: result.insertId });
    });
});

// Update a fundraiser
app.put('/fundraisers/:id', (req, res) => {
    const { id } = req.params;
    const { organizer, caption, targetFunding, currentFunding, city, active, categoryId } = req.body;
    const query = 'UPDATE fundraiser SET ORGANIZER = ?, CAPTION = ?, TARGET_FUNDING = ?, CURRENT_FUNDING = ?, CITY = ?, ACTIVE = ?, CATEGORY_ID = ? WHERE FUNDRAISER_ID = ?';
    db.query(query, [organizer, caption, targetFunding, currentFunding, city, active, categoryId, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Fundraiser updated successfully' });
    });
});

// Delete a fundraiser
app.delete('/fundraisers/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM fundraiser WHERE FUNDRAISER_ID = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Fundraiser deleted successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});