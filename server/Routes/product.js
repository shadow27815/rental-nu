const express = require("express");
const router = express.Router();
const { read, list, create, update, remove, listby } = require('../Controllers/product');

// middleware
//const { auth } = require('../Middleware/auth');
const { upload } = require('../Middleware/upload');

// Routes
router.get('/product', list);
router.post('/productby', listby);
router.get('/product/:id', read);
router.post('/product', upload.single('file'), create);  // Ensure 'file' is the name used in form data
router.put('/product/:id', upload.single('file'), update);  // Ensure 'file' is the name used in form data
router.delete('/product/:id', remove);

module.exports = router;
