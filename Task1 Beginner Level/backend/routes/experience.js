const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { Experience } = require('../models/Models');

// Get all experience (public)
router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ startDate: -1 });
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add experience (admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.status(201).json(experience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update experience (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(experience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete experience (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ message: 'Experience deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
