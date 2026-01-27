// Interactive Particle Background System with Unique Shapes
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.particleCount = 80;

        // Performance optimization: Disable on mobile
        if (window.innerWidth < 768) return;

        this.init();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        const shapes = ['star', 'hexagon', 'triangle', 'square', 'circle', 'diamond'];

        for (let i = 0; i < this.particleCount; i++) {
            const size = Math.random() * 4 + 2;
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const speedX = (Math.random() - 0.5) * 0.5;
            const speedY = (Math.random() - 0.5) * 0.5;
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const rotation = Math.random() * Math.PI * 2;
            const rotationSpeed = (Math.random() - 0.5) * 0.02;

            this.particles.push({
                x, y, size,
                speedX, speedY,
                baseX: x,
                baseY: y,
                density: (Math.random() * 30) + 1,
                shape: shape,
                rotation: rotation,
                rotationSpeed: rotationSpeed,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    // Draw different shapes
    drawStar(x, y, size, rotation) {
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size / 2;

        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.beginPath();

        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI / spikes) * i;
            const pointX = Math.cos(angle) * radius;
            const pointY = Math.sin(angle) * radius;

            if (i === 0) {
                this.ctx.moveTo(pointX, pointY);
            } else {
                this.ctx.lineTo(pointX, pointY);
            }
        }

        this.ctx.closePath();
        this.ctx.restore();
    }

    drawHexagon(x, y, size, rotation) {
        const sides = 6;
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.beginPath();

        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI / 3) * i;
            const pointX = Math.cos(angle) * size;
            const pointY = Math.sin(angle) * size;

            if (i === 0) {
                this.ctx.moveTo(pointX, pointY);
            } else {
                this.ctx.lineTo(pointX, pointY);
            }
        }

        this.ctx.closePath();
        this.ctx.restore();
    }

    drawTriangle(x, y, size, rotation) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size);
        this.ctx.lineTo(size, size);
        this.ctx.lineTo(-size, size);
        this.ctx.closePath();
        this.ctx.restore();
    }

    drawSquare(x, y, size, rotation) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.fillRect(-size, -size, size * 2, size * 2);
        this.ctx.restore();
    }

    drawDiamond(x, y, size, rotation) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size);
        this.ctx.lineTo(size, 0);
        this.ctx.lineTo(0, size);
        this.ctx.lineTo(-size, 0);
        this.ctx.closePath();
        this.ctx.restore();
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.fillStyle = `rgba(79, 143, 247, ${particle.opacity})`;
            this.ctx.strokeStyle = `rgba(79, 143, 247, ${particle.opacity})`;
            this.ctx.lineWidth = 1.5;

            switch (particle.shape) {
                case 'star':
                    this.drawStar(particle.x, particle.y, particle.size, particle.rotation);
                    this.ctx.fill();
                    break;
                case 'hexagon':
                    this.drawHexagon(particle.x, particle.y, particle.size, particle.rotation);
                    this.ctx.stroke();
                    break;
                case 'triangle':
                    this.drawTriangle(particle.x, particle.y, particle.size, particle.rotation);
                    this.ctx.fill();
                    break;
                case 'square':
                    this.drawSquare(particle.x, particle.y, particle.size, particle.rotation);
                    this.ctx.stroke();
                    break;
                case 'diamond':
                    this.drawDiamond(particle.x, particle.y, particle.size, particle.rotation);
                    this.ctx.fill();
                    break;
                default: // circle
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    this.ctx.fill();
            }
        });
    }

    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.5;
                    this.ctx.strokeStyle = `rgba(79, 143, 247, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    moveParticles() {
        this.particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Rotate particles
            particle.rotation += particle.rotationSpeed;

            // Mouse interaction
            if (this.mouse.x != null && this.mouse.y != null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = this.mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * particle.density;
                const directionY = forceDirectionY * force * particle.density;

                if (distance < this.mouse.radius) {
                    particle.x -= directionX;
                    particle.y -= directionY;
                }
            }

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX = -particle.speedX;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY = -particle.speedY;
            }

            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.moveParticles();
        this.drawParticles();
        this.connectParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});
