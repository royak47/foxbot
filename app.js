const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const miningRoutes = require('./routes/miningRoutes');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/mining', miningRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
