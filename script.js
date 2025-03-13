const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFD700', '#FF1493'];

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createParticle(x, y, color) {
    return {
        x: x,
        y: y,
        color: color,
        radius: randomInt(2, 5),
        speedX: (Math.random() - 0.5) * 6,
        speedY: (Math.random() - 0.5) * 6,
        alpha: 1
    };
}

let particles = [];

function burst(x, y) {
    const color = colors[randomInt(0, colors.length - 1)];
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle(x, y, color));
    }
}

// Random bursts every 500ms
setInterval(() => {
    burst(randomInt(0, canvas.width), randomInt(0, canvas.height));
}, 500);

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.alpha -= 0.01;

        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (particle.alpha <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

animate();
