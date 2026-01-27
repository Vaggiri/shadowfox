const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { Certification } = require('../models/Models');

// Get all certifications (public)
router.get('/', async (req, res) => {
    try {
        const certs = await Certification.find().sort({ date: -1 });
        res.json(certs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add certification (admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const cert = new Certification(req.body);
        await cert.save();
        res.status(201).json(cert);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update certification (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(cert);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete certification (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Certification.findByIdAndDelete(req.params.id);
        res.json({ message: 'Certification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
