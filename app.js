const express = require('express');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const miningRoutes = require('./routes/miningRoutes');

dotenv.config();

// Firebase Admin SDK initialization
const serviceAccount = require('./path/to/your/firebase/credentials.json'); // Your Firebase Admin SDK credentials file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Initialize Firestore database

const app = express();

app.use(express.json());

// Routes
app.use('/api/mining', miningRoutes);

// Set up Firestore (or Realtime Database) in your routes as needed

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
