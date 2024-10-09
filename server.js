// server.js
const app = require('./app'); // Import the Express app
// Define the port
const port = 3000; // 
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
