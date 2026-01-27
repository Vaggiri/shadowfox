const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    headline: { type: String, required: true },
    about: { type: String },
    profilePhoto: { type: String },
    bannerImage: { type: String },
    location: String,
    email: { type: String, required: true },
    phone: String,
    socialLinks: {
        linkedin: String,
        github: String,
        instagram: String,
        whatsapp: String
    }
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    authorName: { type: String, required: true },
    authorPhoto: String,
    authorHeadline: String,
    content: { type: String, required: true },
    images: [String],
    videoUrl: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userName: { type: String, required: true },
    userEmail: String,
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const likeSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: String, required: true }, // Browser fingerprint or session ID
    createdAt: { type: Date, default: Date.now }
});

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: String,
    endorsements: { type: Number, default: 0 }
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    startDate: String,
    endDate: String,
    current: { type: Boolean, default: false },
    images: [String]
}, { timestamps: true });

const certificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    date: String,
    url: String,
    image: String
}, { timestamps: true });

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    startDate: String,
    endDate: String,
    current: { type: Boolean, default: false },
    description: String
}, { timestamps: true });

const educationSchema = new mongoose.Schema({
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    startDate: String,
    endDate: String,
    description: String
}, { timestamps: true });

const analyticsSchema = new mongoose.Schema({
    profileViews: { type: Number, default: 0 },
    postViews: { type: Map, of: Number },
    date: { type: Date, default: Date.now }
});

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = {
    Profile: mongoose.model('Profile', profileSchema),
    Post: mongoose.model('Post', postSchema),
    Comment: mongoose.model('Comment', commentSchema),
    Like: mongoose.model('Like', likeSchema),
    Skill: mongoose.model('Skill', skillSchema),
    Project: mongoose.model('Project', projectSchema),
    Certification: mongoose.model('Certification', certificationSchema),
    Experience: mongoose.model('Experience', experienceSchema),
    Education: mongoose.model('Education', educationSchema),
    Analytics: mongoose.model('Analytics', analyticsSchema),
    Admin: mongoose.model('Admin', adminSchema)
};
