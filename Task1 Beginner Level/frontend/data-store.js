// Centralized localStorage manager for the LinkedIn-style portfolio
class DataStore {
    constructor() {
        this.KEYS = {
            AUTH: 'portfolio_auth',
            PROFILE: 'portfolio_profile',
            POSTS: 'portfolio_posts',
            COMMENTS: 'portfolio_comments',
            LIKES: 'portfolio_likes',
            ANALYTICS: 'portfolio_analytics'
        };
        this.init();
    }

    init() {
        // Initialize default data if not exists
        if (!this.get(this.KEYS.AUTH)) {
            this.set(this.KEYS.AUTH, {
                username: 'admin',
                password: 'admin123', // In production, this should be hashed
                session: null
            });
        }

        if (!this.get(this.KEYS.PROFILE)) {
            this.set(this.KEYS.PROFILE, this.getDefaultProfile());
        }

        if (!this.get(this.KEYS.POSTS)) {
            this.set(this.KEYS.POSTS, []);
        }

        if (!this.get(this.KEYS.COMMENTS)) {
            this.set(this.KEYS.COMMENTS, {});
        }

        if (!this.get(this.KEYS.LIKES)) {
            this.set(this.KEYS.LIKES, {});
        }

        if (!this.get(this.KEYS.ANALYTICS)) {
            this.set(this.KEYS.ANALYTICS, {
                profileViews: 0,
                postViews: {},
                totalLikes: 0,
                totalComments: 0
            });
        }
    }

    getDefaultProfile() {
        return {
            name: 'Girisudhan V',
            headline: 'Embedded Systems Engineer & Web Developer',
            about: `I'm an Electronics and Communication Engineering student at Amrita Vishwa Vidyapeetham. I love working on hardware-software integration, debugging sensors, experimenting with microcontroller setups, and exploring how tech can solve everyday problems.

Whether it's designing simple PCBs, optimizing code for microcontrollers, or solving practical issues with IoT gadgets, I'm always down to learn and improve. Right now, I'm expanding my skills in embedded C and hands-on web development.`,
            profilePhoto: '/giri.jpg',
            bannerImage: null,
            location: 'Karur, Tamil Nadu, India',
            email: 'vagcreations2007@gmail.com',
            phone: '+919597296511',
            socialLinks: {
                linkedin: 'https://linkedin.com/in/girisudhanvenkatesh',
                github: 'https://github.com/Vaggiri',
                instagram: 'https://instagram.com/urs._giri_',
                whatsapp: 'https://wa.me/919597296511'
            },
            skills: [
                { name: 'ESP32', endorsements: 0 },
                { name: 'Arduino', endorsements: 0 },
                { name: 'Raspberry Pi', endorsements: 0 },
                { name: 'React.js', endorsements: 0 },
                { name: 'Node.js', endorsements: 0 },
                { name: 'MongoDB', endorsements: 0 },
                { name: 'Python', endorsements: 0 },
                { name: 'C/C++', endorsements: 0 },
                { name: 'IoT', endorsements: 0 },
                { name: 'Machine Learning', endorsements: 0 }
            ],
            experience: [
                {
                    id: 'exp1',
                    title: 'Project Intern',
                    company: 'ShadowFox',
                    location: 'Remote',
                    startDate: '2025-12',
                    endDate: null,
                    current: true,
                    description: 'Working on internship projects and enhancing development skills.'
                },
                {
                    id: 'exp2',
                    title: 'IoT Engineer',
                    company: 'Intel IoT Club',
                    location: 'Amrita University',
                    startDate: '2025-11',
                    endDate: null,
                    current: true,
                    description: 'Developing IoT solutions and contributing to technical projects. Previously served as IoT Intern (Dec 2024 - Nov 2025).'
                },
                {
                    id: 'exp3',
                    title: 'Founder / Lead',
                    company: 'VAG CREATIONS',
                    location: 'India',
                    startDate: '2023-01',
                    endDate: null,
                    current: true,
                    description: 'Tech startup focusing on innovative solutions.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    degree: 'B.Tech - Electrical, Electronics and Communications',
                    institution: 'Amrita Vishwa Vidyapeetham, Coimbatore',
                    startDate: '2024-07',
                    endDate: '2028-06',
                    description: 'Focusing on Embedded Systems and Electronics.'
                },
                {
                    id: 'edu2',
                    degree: 'Higher Secondary (12th Grade)',
                    institution: 'Bharani Park Matric Hr Sec School',
                    startDate: '2023-06',
                    endDate: '2024-03',
                    description: 'Mathematics and Computer Science.'
                }
            ],
            certifications: [
                { id: 'cert1', name: 'Machine Learning Onramp', issuer: 'MathWorks', date: '2025-12', image: null },
                { id: 'cert2', name: 'AIoT Hackathon', issuer: 'Intel IoT Club', date: '2025-10', image: null },
                { id: 'cert3', name: 'Introduction to Flutter', issuer: 'Simplilearn', date: '2025-08', image: null },
                { id: 'cert4', name: 'Introduction to IoT', issuer: 'Cisco', date: '2025', image: null }
            ],
            projects: [
                {
                    id: 'proj1',
                    title: 'Smart Grocery Basket',
                    description: 'I worked on building the barcode-scanning pipeline using an ESP32-CAM. The camera streams frames to a Node.js server hosted on Render, where the barcode is decoded through cloud processing.',
                    startDate: '2025-10',
                    endDate: null,
                    current: true,
                    tags: ['ESP32', 'Node.js', 'Arduino IDE'],
                    images: []
                },
                {
                    id: 'proj2',
                    title: 'Bicycle Locker',
                    description: 'Full-stack MERN application for smart bicycle locker system with authentication and hardware integration.',
                    startDate: '2025-08',
                    endDate: '2026-01',
                    current: false,
                    tags: ['React Native', 'Node.js', 'MERN Stack', 'MongoDB'],
                    images: []
                }
            ]
        };
    }

    // Generic get/set methods
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    }

    // Authentication methods
    getAuth() {
        return this.get(this.KEYS.AUTH);
    }

    setSession(sessionData) {
        const auth = this.getAuth();
        auth.session = sessionData;
        return this.set(this.KEYS.AUTH, auth);
    }

    clearSession() {
        const auth = this.getAuth();
        auth.session = null;
        return this.set(this.KEYS.AUTH, auth);
    }

    isAuthenticated() {
        const auth = this.getAuth();
        return auth && auth.session && auth.session.expiresAt > Date.now();
    }

    // Profile methods
    getProfile() {
        return this.get(this.KEYS.PROFILE);
    }

    updateProfile(updates) {
        const profile = this.getProfile();
        const updated = { ...profile, ...updates };
        return this.set(this.KEYS.PROFILE, updated);
    }

    // Posts methods
    getPosts() {
        return this.get(this.KEYS.POSTS) || [];
    }

    getPost(postId) {
        const posts = this.getPosts();
        return posts.find(p => p.id === postId);
    }

    addPost(post) {
        const posts = this.getPosts();
        posts.unshift(post); // Add to beginning
        return this.set(this.KEYS.POSTS, posts);
    }

    updatePost(postId, updates) {
        const posts = this.getPosts();
        const index = posts.findIndex(p => p.id === postId);
        if (index !== -1) {
            posts[index] = { ...posts[index], ...updates };
            return this.set(this.KEYS.POSTS, posts);
        }
        return false;
    }

    deletePost(postId) {
        const posts = this.getPosts();
        const filtered = posts.filter(p => p.id !== postId);
        return this.set(this.KEYS.POSTS, filtered);
    }

    // Comments methods
    getComments(postId) {
        const allComments = this.get(this.KEYS.COMMENTS) || {};
        return allComments[postId] || [];
    }

    addComment(postId, comment) {
        const allComments = this.get(this.KEYS.COMMENTS) || {};
        if (!allComments[postId]) {
            allComments[postId] = [];
        }
        allComments[postId].push(comment);
        return this.set(this.KEYS.COMMENTS, allComments);
    }

    deleteComment(postId, commentId) {
        const allComments = this.get(this.KEYS.COMMENTS) || {};
        if (allComments[postId]) {
            allComments[postId] = allComments[postId].filter(c => c.id !== commentId);
            return this.set(this.KEYS.COMMENTS, allComments);
        }
        return false;
    }

    // Likes methods
    getLikes(postId) {
        const allLikes = this.get(this.KEYS.LIKES) || {};
        return allLikes[postId] || [];
    }

    toggleLike(postId, userId) {
        const allLikes = this.get(this.KEYS.LIKES) || {};
        if (!allLikes[postId]) {
            allLikes[postId] = [];
        }

        const index = allLikes[postId].indexOf(userId);
        if (index === -1) {
            allLikes[postId].push(userId);
        } else {
            allLikes[postId].splice(index, 1);
        }

        return this.set(this.KEYS.LIKES, allLikes);
    }

    hasLiked(postId, userId) {
        const likes = this.getLikes(postId);
        return likes.includes(userId);
    }

    getLikeCount(postId) {
        return this.getLikes(postId).length;
    }

    // Analytics methods
    getAnalytics() {
        return this.get(this.KEYS.ANALYTICS);
    }

    incrementProfileViews() {
        const analytics = this.getAnalytics();
        analytics.profileViews++;
        return this.set(this.KEYS.ANALYTICS, analytics);
    }

    incrementPostViews(postId) {
        const analytics = this.getAnalytics();
        if (!analytics.postViews[postId]) {
            analytics.postViews[postId] = 0;
        }
        analytics.postViews[postId]++;
        return this.set(this.KEYS.ANALYTICS, analytics);
    }

    // Export/Import data
    exportData() {
        return {
            profile: this.getProfile(),
            posts: this.getPosts(),
            comments: this.get(this.KEYS.COMMENTS),
            likes: this.get(this.KEYS.LIKES),
            analytics: this.getAnalytics()
        };
    }

    importData(data) {
        if (data.profile) this.set(this.KEYS.PROFILE, data.profile);
        if (data.posts) this.set(this.KEYS.POSTS, data.posts);
        if (data.comments) this.set(this.KEYS.COMMENTS, data.comments);
        if (data.likes) this.set(this.KEYS.LIKES, data.likes);
        if (data.analytics) this.set(this.KEYS.ANALYTICS, data.analytics);
        return true;
    }

    clearAllData() {
        Object.values(this.KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        this.init();
    }
}

// Create singleton instance
const dataStore = new DataStore();
export default dataStore;
