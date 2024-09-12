const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { readdirSync } = require('fs');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Load routes dynamically
readdirSync('./routes').forEach(file => {
    if (file.endsWith('.js')) {
        const route = require(`./routes/${file}`);
        app.use('/api', route);
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
