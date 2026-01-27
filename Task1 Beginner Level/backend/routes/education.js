const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { Education } = require('../models/Models');

// Get all education (public)
router.get('/', async (req, res) => {
    try {
        const education = await Education.find().sort({ startDate: -1 });
        res.json(education);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add education (admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const edu = new Education(req.body);
        await edu.save();
        res.status(201).json(edu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update education (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(edu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete education (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ message: 'Education deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
