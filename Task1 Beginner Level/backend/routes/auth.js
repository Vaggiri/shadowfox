const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models/Models');

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin
        let admin = await Admin.findOne({ username });

        // If no admin exists, create default one
        if (!admin) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            admin = new Admin({
                username: 'admin',
                password: hashedPassword
            });
            await admin.save();
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { id: admin._id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token, username: admin.username });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify token
router.get('/verify', async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ valid: false });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.json({ valid: true });
    } catch (error) {
        res.json({ valid: false });
    }
});

module.exports = router;
