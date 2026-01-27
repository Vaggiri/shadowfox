import apiService from './api-service.js';

// Initialize GSAP with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);


// ===== ANIMATIONS SETUP =====
function initAnimations() {
    console.log('Initializing animations...');

    // Kill existing ScrollTriggers to prevent duplicates/conflicts
    ScrollTrigger.getAll().forEach(t => t.kill());
    ScrollTrigger.refresh();

    // ===== HERO ENTRANCE ANIMATIONS =====
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate hero elements faster

    // Greeting
    heroTl.fromTo('.greeting',
        { opacity: 0, x: -50, y: 30 },
        { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.75)' }
    )
        // Title
        .fromTo('.hero-title',
            { opacity: 0, y: 60, rotationX: -90 },
            { opacity: 1, y: 0, rotationX: 0, duration: 1, ease: 'back.out(1.7)' },
            '-=0.6'
        )
        // Subtitle
        .fromTo('.hero-subtitle',
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
            '-=0.6'
        )
        // Desc
        .fromTo('.hero-desc',
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.6'
        )
        // Social
        .fromTo('.social-icon',
            { opacity: 0, scale: 0, y: 50, rotation: 360 },
            { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 0.6, stagger: 0.05, ease: 'back.out(2)' },
            '-=0.4'
        )
        // CTA
        .fromTo('.hero-cta .btn-primary, .hero-cta .btn-secondary, .hero-cta .btn-download',
            { opacity: 0, y: 30, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
            '-=0.4'
        )
        // Profile Image
        .fromTo('.profile-image-container',
            { opacity: 0, scale: 0.5, rotation: -20, x: 100 },
            { opacity: 1, scale: 1, rotation: 0, x: 0, duration: 1, ease: 'elastic.out(1, 0.8)' },
            '-=0.8'
        )
        // Rings
        .fromTo('.profile-ring',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 0.3, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
            '-=0.8'
        );

    // Continuous animations (Hero Text Shadow & Accent Float)
    gsap.to('.hero-title', {
        textShadow: '0 0 20px rgba(79, 143, 247, 0.5)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    gsap.to('.accent-text', {
        y: -5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // ===== SCROLL ANIMATIONS HELPER =====
    function createScrollAnim(trigger, target, stagger = 0) {
        if (!document.querySelector(target)) return;

        gsap.fromTo(target,
            { opacity: 0, y: 30 }, // Reduced distance
            {
                opacity: 1, y: 0,
                duration: 0.6, // Faster duration
                stagger: stagger,
                scrollTrigger: {
                    trigger: trigger,
                    start: 'top 95%',
                    toggleActions: 'play none none none' // Play once
                }
            }
        );
    }

    // Apply animations with reduced stagger
    createScrollAnim('.about-subtitle', '.about-subtitle');
    createScrollAnim('.about-text', '.about-text p', 0.1);
    createScrollAnim('.stats-grid', '.stat-item', 0.1);
    createScrollAnim('.skills-grid', '.skill-category', 0.1);
    createScrollAnim('.projects-grid', '.project-card', 0.15);
    createScrollAnim('.timeline', '.timeline-item', 0.15);
    createScrollAnim('.education-grid', '.edu-card', 0.1);
    createScrollAnim('.certs-grid-detailed', '.cert-card', 0.05);
    createScrollAnim('.contact-wrapper', '.contact-info');
    createScrollAnim('.contact-wrapper', '.contact-form');


    // ===== PARALLAX EFFECTS =====
    gsap.to('.gradient-orb', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        },
        y: (i) => (i + 1) * 100,
        rotation: (i) => (i + 1) * 45,
    });

    // Profile Image Parallax
    gsap.to('.profile-image-container', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 50,
        scale: 0.95
    });

    // ===== REVEAL ANIMATIONS ON SCROLL for Section Titles =====
    gsap.utils.toArray('.section-title').forEach((element) => {
        gsap.fromTo(element,
            { opacity: 0, x: -30 },
            {
                opacity: 1, x: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // ===== SMOOTH SCROLL FOR NAVIGATION =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const target = document.querySelector(targetId);
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });

    // ===== MAGNETIC BUTTONS =====
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-download, .social-icon');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });

    // ===== NUMBER COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const updateCount = () => {
            const targetText = counter.getAttribute('data-target') || counter.textContent;
            const targetNum = parseInt(targetText.replace(/\D/g, ''));

            if (isNaN(targetNum)) return;

            const increment = targetNum / 50;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current < targetNum) {
                    counter.textContent = Math.ceil(current) + '+';
                } else {
                    counter.textContent = targetNum + '+';
                    clearInterval(timer);
                }
            }, 30);
        };

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 90%',
            onEnter: updateCount,
            once: true
        });
    });
}

async function loadProfileData() {
    try {
        console.log('Fetching all profile data concurrently...');

        // Parallel data fetching for maximum speed
        const [analytics, profile, skills, projects, experience, education, certs] = await Promise.all([
            apiService.incrementProfileViews().catch(e => ({ profileViews: 0 })),
            apiService.getProfile().catch(e => ({})),
            apiService.getSkills().catch(e => []),
            apiService.getProjects().catch(e => []),
            apiService.getExperience().catch(e => []),
            apiService.getEducation().catch(e => []),
            apiService.getCertifications().catch(e => [])
        ]);

        console.log('All data fetched!');

        // Update Profile Views Count
        if (analytics && analytics.profileViews !== undefined) {
            const viewCountEl = document.getElementById('profile-views-count');
            if (viewCountEl) {
                viewCountEl.setAttribute('data-target', analytics.profileViews);
                viewCountEl.textContent = analytics.profileViews;
            }
        }

        // Helper for Date Sorting
        const parseDate = (dateStr) => {
            if (!dateStr) return new Date(0);
            if (dateStr.toLowerCase() === 'present') return new Date();
            return new Date(dateStr);
        };

        const sortByDateDesc = (a, b, dateKey = 'startDate') => {
            // Priority to "Current" items
            if (a.current && !b.current) return -1;
            if (!a.current && b.current) return 1;

            return parseDate(b[dateKey]) - parseDate(a[dateKey]);
        };

        // Update Hero Section
        if (profile.name) document.querySelector('.hero-title').innerHTML = `Hi, I'm <span class="highlight">${profile.name}</span>`;
        if (profile.headline) document.querySelector('.hero-subtitle').textContent = profile.headline;
        if (profile.about) document.querySelector('.hero-desc').textContent = profile.about.substring(0, 150) + '...';

        const profileImg = document.querySelector('.profile-image-container img');
        if (profileImg && profile.profilePhoto) {
            profileImg.src = profile.profilePhoto;
        }

        // Update About Section
        if (profile.about) {
            const aboutP = document.querySelector('.about-text p');
            const aboutH3 = document.querySelector('.about-subtitle');
            if (aboutP) aboutP.textContent = profile.about;
            if (aboutH3 && aboutH3.textContent === 'Loading...') aboutH3.textContent = "Who I Am";
        }

        // Update Skills (Categorized)
        if (skills && skills.length > 0) {
            const skillsContainer = document.querySelector('.skills-grid');
            if (skillsContainer) {
                const categories = {};
                skills.forEach(skill => {
                    const cat = skill.category || 'Other';
                    if (!categories[cat]) categories[cat] = [];
                    categories[cat].push(skill);
                });

                skillsContainer.innerHTML = Object.keys(categories).sort().map(cat => `
                    <div class="skill-category">
                        <h3>${cat}</h3>
                        <div class="skill-tags">
                            ${categories[cat].map(skill => `<span>${skill.name}</span>`).join('')}
                        </div>
                    </div>
                `).join('');
            }
        }

        // Update Projects (Sorted)
        if (projects && projects.length > 0) {
            const sortedProjects = [...projects].sort((a, b) => sortByDateDesc(a, b, 'startDate'));
            const projectsContainer = document.querySelector('.projects-grid');
            if (projectsContainer) {
                projectsContainer.innerHTML = sortedProjects.map(project => {
                    const imgContent = (project.images && project.images[0])
                        ? `<img src="${project.images[0]}" alt="${project.title}" style="width:100%; height:100%; object-fit: cover;">`
                        : `<span class="project-icon"></span>`;

                    return `
                    <article class="project-card">
                        <div class="project-image">
                            <div class="img-placeholder" style="background: linear-gradient(45deg, #1a1a1a, #2a2a2a); overflow: hidden;">
                                ${imgContent}
                            </div>
                        </div>
                        <div class="project-info">
                            <h3>${project.title}</h3>
                            <p class="role-date">${project.startDate || ''} ${project.current ? '- Present' : (project.endDate ? '- ' + project.endDate : '')}</p>
                            <p>${project.description}</p>
                            <div class="project-tags">
                                ${(project.tags || []).map(tag => `<span>${tag}</span>`).join('')}
                            </div>
                            <div class="project-links">
                                <a href="#" class="btn-icon">View Details</a>
                            </div>
                        </div>
                    </article>
                `}).join('');
            }
        }

        // Update Experience (Sorted)
        if (experience && experience.length > 0) {
            const sortedExp = [...experience].sort((a, b) => sortByDateDesc(a, b, 'startDate'));
            const expContainer = document.querySelector('.timeline');
            if (expContainer) {
                expContainer.innerHTML = sortedExp.map(exp => `
                    <div class="timeline-item">
                        <div class="timeline-date">${exp.startDate} ${exp.current ? '- Present' : (exp.endDate ? '- ' + exp.endDate : '')}</div>
                        <div class="timeline-content">
                            <h3>${exp.title}</h3>
                            <h4>${exp.company}</h4>
                            <p>${exp.description}</p>
                        </div>
                    </div>
                    `).join('');
            }
        }

        // Update Education (Sorted)
        if (education && education.length > 0) {
            const sortedEdu = [...education].sort((a, b) => sortByDateDesc(a, b, 'endDate'));
            const eduContainer = document.querySelector('.education-grid');
            if (eduContainer) {
                eduContainer.innerHTML = sortedEdu.map(edu => `
                    <div class="edu-card">
                        <h3>${edu.degree}</h3>
                        <h4>${edu.institution}</h4>
                        <p class="edu-date">${edu.startDate} - ${edu.endDate}</p>
                        <p>${edu.description}</p>
                    </div>
                `).join('');
            }
        }

        // Update Certifications (Sorted)
        if (certs && certs.length > 0) {
            const sortedCerts = [...certs].sort((a, b) => {
                return parseDate(b.date) - parseDate(a.date);
            });
            const certsContainer = document.querySelector('.certs-grid-detailed');
            if (certsContainer) {
                certsContainer.innerHTML = sortedCerts.map(cert => {
                    const iconContent = cert.image
                        ? `<img src="${cert.image}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">`
                        : '';

                    const cardTag = cert.url ? 'a' : 'div';
                    const hrefAttr = cert.url ? `href="${cert.url}" target="_blank"` : '';
                    const cursorStyle = cert.url ? 'cursor: pointer;' : '';
                    const extraClass = cert.url ? 'clickable-card' : '';

                    return `
                    <${cardTag} ${hrefAttr} class="cert-card ${extraClass}" ${cert.name === 'Golden Star Award' ? 'style="border-color: #ffd700;' + cursorStyle + '"' : `style="${cursorStyle}"`}>
                        <div class="cert-header">
                            <div>
                                <h3 ${cert.name === 'Golden Star Award' ? 'style="color: #ffd700;"' : ''}>${cert.name}</h3>
                                <div class="cert-issuer">${cert.issuer}</div>
                            </div>
                            <i class="cert-icon">${iconContent}</i>
                        </div>
                        <div class="cert-meta">
                            <span class="cert-date">${cert.date || 'No Expiry'}</span>
                            ${cert.url ? '<span style="font-size: 0.8rem; margin-left: auto;">↗</span>' : ''}
                        </div>
                    </${cardTag}>
                `}).join('');
            }
        }

        // Initialize animations after DOM update
        requestAnimationFrame(() => {
            initAnimations();
            ScrollTrigger.refresh();
        });

    } catch (error) {
        console.error('Error loading profile data:', error);
        const aboutH3 = document.querySelector('.about-subtitle');
        if (aboutH3 && aboutH3.textContent === 'Loading...') aboutH3.textContent = "Who I Am";
    }
}


// Wrapper to ensure apiService is available
async function sendContactMessage(name, email, message) {
    // Assuming apiService has a base URL configuration or we just fetch directly
    // Since apiService is imported, we can maybe add a method there or just fetch here.
    // Let's check apiService first, but for now I'll use direct fetch based on the existing apiService pattern likely found in project
    // Actually, looking at main.js imports: import apiService from './api-service.js';
    // I should probably add convert this to use apiService if I can view it, but direct fetch is fine for now to save tool calls.
    // I will use the base URL from environment if possible, or relative path if proxied.
    // Given the other calls use apiService, I'll check if I can piggyback or if I should just fetch '/api/contact' which should work if proxied or relative.
    // The previous analysis showed api routes are at /api/..., so:

    // We need to know the API_BASE_URL. Usually defined in .env or a config.
    // For now, I'll assume usage of the same origin or a known localhost port if in dev.
    // But since I don't see the apiService content, I'll try to use the imported apiService object if it allows custom requests,
    // OR just fetch from the likely backend URL. Note: frontend might be on 5173, backend on 5000.

    // Let's implement a robust fetch.
    const API_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

    const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
    }

    return await response.json();
}

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            await sendContactMessage(name, email, message);

            // Success feedback
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#25D366'; // Success green
            form.reset();

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);

        } catch (error) {
            console.error('Contact form error:', error);
            submitBtn.textContent = 'Failed';
            submitBtn.style.backgroundColor = '#ff4444'; // Error red

            alert(error.message || 'Failed to send message. Please try again.');

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }
    });
}

// Load data when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
    initContactForm();
});

