const express = require('express');
const router = express.Router();
const { Analytics } = require('../models/Models');

// Get analytics
router.get('/', async (req, res) => {
    try {
        let analytics = await Analytics.findOne();

        if (!analytics) {
            analytics = new Analytics({ profileViews: 0 });
            await analytics.save();
        }

        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Increment profile views
router.post('/profile-view', async (req, res) => {
    try {
        let analytics = await Analytics.findOne();

        if (!analytics) {
            analytics = new Analytics({ profileViews: 1 });
        } else {
            analytics.profileViews += 1;
        }

        await analytics.save();
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
