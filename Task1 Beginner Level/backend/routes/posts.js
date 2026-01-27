const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { Post, Comment, Like } = require('../models/Models');

// Get all posts (public)
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create post (admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update post (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete post (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({ postId: req.params.id });
        await Like.deleteMany({ postId: req.params.id });
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get comments for a post (public)
router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add comment (public)
router.post('/:id/comments', async (req, res) => {
    try {
        const comment = new Comment({
            postId: req.params.id,
            ...req.body
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete comment (admin only)
router.delete('/:postId/comments/:commentId', authMiddleware, async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.commentId);
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get likes for a post (public)
router.get('/:id/likes', async (req, res) => {
    try {
        const likes = await Like.find({ postId: req.params.id });
        res.json(likes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Toggle like (public)
router.post('/:id/like', async (req, res) => {
    try {
        const { userId } = req.body;
        const existing = await Like.findOne({ postId: req.params.id, userId });

        if (existing) {
            await Like.findByIdAndDelete(existing._id);
            res.json({ liked: false });
        } else {
            const like = new Like({ postId: req.params.id, userId });
            await like.save();
            res.json({ liked: true });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
