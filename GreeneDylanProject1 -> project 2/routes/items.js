const express = require('express');
const multer = require('multer');
const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/'); // Make sure this directory exists
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Temporary in-memory storage for items
let items = [];

// Route to display the form for adding a new item
router.get('/new', (req, res) => {
    res.render('new');
});

// Route to handle form submission
router.post('/add', upload.single('image'), (req, res) => {
    const { title, price, condition, details } = req.body;
    const newItem = {
        id: items.length + 1,
        title,
        price,
        condition,
        details,
        image: req.file ? '/uploads/' + req.file.filename : '' // Adjust path as needed
    };
    items.push(newItem);
    res.redirect('/items'); // Redirect to the items listing page
});

// Route to display all items
router.get('/', (req, res) => {
    res.render('items', { items });
});



module.exports = router;
