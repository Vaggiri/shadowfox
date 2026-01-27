require('dotenv').config();
const mongoose = require('mongoose');
const { Profile, Project, Skill, Experience, Education, Certification, Access } = require('./models/Models');

const seedData = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Profile.deleteMany({});
        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Experience.deleteMany({});
        await Education.deleteMany({});
        await Certification.deleteMany({});
        console.log('🧹 Cleared existing data');

        // 1. Profile Data
        const profileData = {
            name: 'Girisudhan V',
            headline: 'Embedded Systems Engineer & Web Developer',
            about: `I'm an Electronics and Communication Engineering student at Amrita Vishwa Vidyapeetham. I love working on hardware-software integration, debugging sensors, experimenting with microcontroller setups, and exploring how tech can solve everyday problems.\n\nWhether it's designing simple PCBs, optimizing code for microcontrollers, or solving practical issues with IoT gadgets, I'm always down to learn and improve. Right now, I'm expanding my skills in embedded C and hands-on web development.`,
            profilePhoto: './giri.jpg',
            location: 'Karur, Tamil Nadu, India',
            email: 'vagcreations2007@gmail.com',
            phone: '+919597296511',
            socialLinks: {
                linkedin: 'https://linkedin.com/in/girisudhanvenkatesh',
                github: 'https://github.com/Vaggiri',
                instagram: 'https://instagram.com/urs._giri_',
                whatsapp: 'https://wa.me/919597296511'
            }
        };

        await Profile.create(profileData);
        console.log('✅ Profile created');

        // 2. Skills
        // Categorized based on index.html
        const skills = [
            // Embedded & IoT
            { name: 'ESP32', category: 'Embedded & IoT', endorsements: 0 },
            { name: 'Arduino', category: 'Embedded & IoT', endorsements: 0 },
            { name: 'Raspberry Pi', category: 'Embedded & IoT', endorsements: 0 },
            { name: 'Microcontrollers', category: 'Embedded & IoT', endorsements: 0 },
            { name: 'IoT Sensors', category: 'Embedded & IoT', endorsements: 0 },
            { name: 'PCB Design', category: 'Embedded & IoT', endorsements: 0 },

            // Web & App Dev
            { name: 'React.js', category: 'Web & App Dev', endorsements: 0 },
            { name: 'Node.js', category: 'Web & App Dev', endorsements: 0 },
            { name: 'MongoDB', category: 'Web & App Dev', endorsements: 0 },
            { name: 'MERN Stack', category: 'Web & App Dev', endorsements: 0 },
            { name: 'Flutter', category: 'Web & App Dev', endorsements: 0 },
            { name: 'React Native', category: 'Web & App Dev', endorsements: 0 },
            { name: 'Flask', category: 'Web & App Dev', endorsements: 0 },
            { name: 'Tailwind CSS', category: 'Web & App Dev', endorsements: 0 },
            { name: 'Vite.js', category: 'Web & App Dev', endorsements: 0 },

            // Languages
            { name: 'Python', category: 'Languages', endorsements: 0 },
            { name: 'C', category: 'Languages', endorsements: 0 },
            { name: 'C++', category: 'Languages', endorsements: 0 },
            { name: 'JavaScript', category: 'Languages', endorsements: 0 },
            { name: 'MATLAB', category: 'Languages', endorsements: 0 },
            { name: 'HTML5/CSS3', category: 'Languages', endorsements: 0 },
            { name: 'MYSql', category: 'Languages', endorsements: 0 },

            // Tools & Others
            { name: 'Git', category: 'Tools & Others', endorsements: 0 },
            { name: 'VS Code', category: 'Tools & Others', endorsements: 0 },
            { name: 'LTSpice', category: 'Tools & Others', endorsements: 0 },
            { name: 'OpenCV', category: 'Tools & Others', endorsements: 0 },
            { name: 'Machine Learning', category: 'Tools & Others', endorsements: 0 },
            { name: 'Firebase', category: 'Tools & Others', endorsements: 0 },
            { name: 'Arduino IDE', category: 'Tools & Others', endorsements: 0 },
            { name: 'Kicad', category: 'Tools & Others', endorsements: 0 },
            { name: 'Jupyter Notebook', category: 'Tools & Others', endorsements: 0 },
            { name: 'Google Colab', category: 'Tools & Others', endorsements: 0 }
        ];
        await Skill.insertMany(skills);
        console.log('✅ Skills created');

        // 3. Experience
        const experience = [
            {
                title: 'Project Intern',
                company: 'ShadowFox',
                location: 'Remote',
                startDate: 'Dec 2025',
                current: true,
                description: 'Working on internship projects and enhancing development skills.'
            },
            {
                title: 'IoT Engineer',
                company: 'Intel IoT Club',
                location: 'Amrita University',
                startDate: 'Nov 2025',
                current: true,
                description: 'Developing IoT solutions and contributing to technical projects. Previously served as IoT Intern (Dec 2024 - Nov 2025).'
            },
            {
                title: 'Founder / Lead',
                company: 'VAG CREATIONS',
                location: 'India',
                startDate: 'Jan 2023',
                current: true,
                description: 'Tech startup focusing on innovative solutions.'
            }
        ];
        await Experience.insertMany(experience);
        console.log('✅ Experience created');

        // 4. Education
        const education = [
            {
                degree: 'B.Tech - Electrical, Electronics and Communications',
                institution: 'Amrita Vishwa Vidyapeetham, Coimbatore',
                startDate: 'July 2024',
                endDate: 'June 2028',
                description: 'Focusing on Embedded Systems and Electronics.'
            },
            {
                degree: 'Higher Secondary (12th Grade)',
                institution: 'Bharani Park Matric Hr Sec School',
                startDate: 'June 2023',
                endDate: 'March 2024',
                description: 'Mathematics and Computer Science.'
            }
        ];
        await Education.insertMany(education);
        console.log('✅ Education created');

        // 5. Certifications
        const certifications = [
            { name: 'Machine Learning Onramp', issuer: 'MathWorks', date: 'Dec 2025', image: '📜' },
            { name: 'AIoT Hackathon', issuer: 'Intel IoT Club', date: 'Oct 2025', image: '🏆' },
            { name: 'Introduction to Flutter', issuer: 'Simplilearn', date: 'Aug 2025', image: '📱' },
            { name: 'Introduction to IoT', issuer: 'Cisco', date: '2025', image: '🌐' },
            { name: 'MATLAB Certified', issuer: 'MathWorks', date: '', image: '🔢' },
            { name: 'Simulink Certified', issuer: 'MathWorks', date: '', image: '⚙️' },
            { name: 'Software Engineer Intern', issuer: 'HackerRank', date: '', image: '💻' },
            { name: 'JavaScript for Beginners', issuer: 'Simplilearn', date: '', image: '⚡' },
            { name: 'Machine Learning', issuer: 'Udemy', date: '', image: '🤖' },
            { name: 'Golden Star Award', issuer: 'Girisudhan V', date: 'Honors & Awards', image: '⭐' }
        ];
        await Certification.insertMany(certifications);
        console.log('✅ Certifications created');

        // 6. Projects
        const projects = [
            {
                title: 'Smart Grocery Basket',
                description: 'I worked on building the barcode-scanning pipeline using an ESP32-CAM. The camera streams frames to a Node.js server hosted on Render, where the barcode is decoded through cloud processing. Once decoded, the product data is pushed to the /result endpoint for real-time updates inside the system.',
                startDate: 'Oct 2025',
                current: true,
                tags: ['ESP32 Microcontrollers', 'Node.js', 'Arduino IDE'],
                images: ['🛒'] // storing icon as first image for now
            },
            {
                title: 'Bicycle Locker',
                description: 'I contributed as a full-stack developer on a smart bicycle locker project using the MERN stack. I designed, developed, and deployed the complete login and authentication system. I contributed across the entire project, handling frontend and backend development, fixing critical bugs, and actively assisting the hardware team with integration and troubleshooting to ensure smooth end-to-end system functionality.',
                startDate: 'Aug 2025',
                endDate: 'Jan 2026',
                current: false,
                tags: ['React Native', 'Node.js', 'MERN Stack', 'React.js', 'MongoDB', 'vite.js'],
                images: ['🚲']
            },
            {
                title: 'AIoT powered Air Quality Forecaster',
                description: 'I built a system that forecasts city-level air quality using a trained machine learning model. The setup is mounted on public transport vehicles so it can collect live environmental data while moving around the city. All the readings get pushed to a web dashboard where both users and admins can monitor the air quality in real time.',
                startDate: 'Aug 2025',
                endDate: 'Dec 2025',
                current: false,
                tags: ['Internet of Things (IoT)', 'Python', 'Web Development', 'Machine Learning'],
                images: ['☁️']
            },
            {
                title: 'QR Based Door Entry',
                description: 'Contributed to building a real-time student verification system for workshop access, using ESP32-CAM for QR code scanning and Firebase for mobile camera input. Integrated Google Sheets for registration data and a Flask backend for verification logic, statistics, and report generation. Enhanced the web dashboard with a responsive UI, Dark Mode, login-based access, and PDF export.',
                startDate: 'Jul 2025',
                endDate: 'Aug 2025',
                current: false,
                tags: ['Tailwind CSS', 'Firebase', 'Google Sheets', 'OpenCV', 'JavaScript', 'Python', 'API', 'Flask'],
                images: ['🚪']
            },
            {
                title: 'Mini Mapper',
                description: 'Contributed as frontend developer for web dashboard for a navigation system designed for bikers, focusing on minimalism and power efficiency. The system takes the rider’s current location, accepts a destination via a mobile app or web interface, and uses Google Maps API or OpenStreetMap API to generate the optimal route.',
                startDate: 'Jun 2025',
                endDate: 'Jul 2025',
                current: false,
                tags: ['Tailwind CSS', 'HTML', 'JavaScript', 'Python', 'Flask'],
                images: ['🗺️']
            }
        ];
        await Project.insertMany(projects);
        console.log('✅ Projects created');

        console.log('🎉 Database seeded successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
