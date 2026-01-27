const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { Profile } = require('../models/Models');

// Get profile (public)
router.get('/', async (req, res) => {
    try {
        let profile = await Profile.findOne();
        
        // If no profile exists, create default
        if (!profile) {
            profile = new Profile({
                name: 'Girisudhan V',
                headline: 'Full Stack Developer',
                about: 'Passionate developer creating amazing web experiences',
                email: 'contact@portfolio.com',
                location: 'India'
            });
            await profile.save();
        }
        
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update profile (admin only)
router.put('/', authMiddleware, async (req, res) => {
    try {
        let profile = await Profile.findOne();
        
        if (!profile) {
            profile = new Profile(req.body);
        } else {
            Object.assign(profile, req.body);
        }
        
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
