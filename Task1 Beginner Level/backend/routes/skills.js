const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { Skill } = require('../models/Models');

// Get all skills (public)
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ createdAt: -1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add skill (admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        res.status(201).json(skill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete skill (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update skill (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(skill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
