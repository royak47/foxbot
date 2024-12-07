const express = require('express');
const { addMiningPoints, getMiningPoints } = require('../controllers/miningController');
const router = express.Router();

// Add daily mining points
router.post('/add', addMiningPoints);

// Fetch daily and total mining points
router.get('/:userId', getMiningPoints);

module.exports = router;
