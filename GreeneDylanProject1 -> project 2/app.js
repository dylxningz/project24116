// Import necessary modules
const express = require('express');
const path = require('path');


// Initialize express app
const app = express();
const port = 3000; // You can choose any port

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Import routes
const itemRoutes = require('./routes/items');
// Home route
app.get('/', (req, res) => {
  res.render('index'); // Assuming you have an index.ejs in your views directory
});

app.get('/new', (req, res) => {
  res.render('new'); // Ensure this is placed before the catch-all 404 route
});

// Search route example
app.get('/search', (req, res) => {
  // Implementation of search logic based on query parameters
  // Example: const searchQuery = req.query.query;
  res.render('searchResults'); // Assuming you have a searchResults.ejs
});

// Additional routes like signup, login could be added here following the same pattern

// Use item routes
app.use('/items', itemRoutes); // Use item-specific routes

// Catch-all for 404 Not Found - This should be one of the last routes
app.use((req, res) => {
  res.status(404).render('404'); // Assuming you have a 404.ejs
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});