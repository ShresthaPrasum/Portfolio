
document.addEventListener("DOMContentLoaded", () => {
// --- 🤖 Typing Animation ---
const typingText = document.getElementById("typing-text");
const words = ["Aspiring Game Developer", "Tech Explorer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => (isDeleting = true), 2000);
    } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    }

    const typeSpeed = isDeleting ? 100 : 150;
    setTimeout(type, typeSpeed);
}
type();

const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function updateClock() {
    const time = new Date();
    // const month = time.getMonth();
    // const date = time.getDate();
    // const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour % 12 || 12; // Handles midnight
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeEl.innerHTML = `${hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat}:${minutes < 10 ? '0' + minutes : minutes} <span style="font-size: 1rem;">${ampm}</span>`;
    // dateEl.innerHTML = `${days[day]}, ${months[month]}/${date}`;
}
updateClock(); // Initial call
setInterval(updateClock, 1000); // Update every second


// --- 📖 Read More Button ---
const readMoreBtn = document.getElementById("read-more-btn");
const funFacts = document.getElementById("fun-facts");
readMoreBtn.addEventListener("click", () => {
    if (funFacts.style.display === "block") {
    funFacts.style.display = "none";
    readMoreBtn.textContent = "Read More";
    } else {
    funFacts.style.display = "block";
    readMoreBtn.textContent = "Show Less";
    }
});

// --- ⬆️ Back to Top Button ---
const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible");
    } else {
    backToTopBtn.classList.remove("visible");
    }
});

// --- 💡 Light/Dark Mode Toggle ---
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
const toggleIcon = darkModeToggle.querySelector("i");

// Function to set mode
function setMode(isLight) {
    if (isLight) {
    body.classList.add("light-mode");
    toggleIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
    } else {
    body.classList.remove("light-mode");
    toggleIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
    }
}

// Check for saved preference
if (localStorage.getItem("theme") === "light") {
    setMode(true);
} else {
    setMode(false); // Default to dark
}

darkModeToggle.addEventListener("click", () => {
    setMode(!body.classList.contains("light-mode"));
});

// --- 👁️ Intersection Observer for animations ---
const sections = document.querySelectorAll("section");
const skills = document.querySelectorAll(".skill");

const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Animate progress bars
        if (entry.target.id === "skills") {
            document.querySelectorAll(".progress").forEach((progress) => {
            progress.style.width = progress.getAttribute("data-width");
            });
        }
        // Don't unobserve home section to keep it active
        if (entry.target.id !== "home") {
            observer.unobserve(entry.target);
        }
        }
    });
    },
    { threshold: 0.1 }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});

// --- ✉️ Contact Form Logic (without JS validation for Formspree) ---
const form = document.getElementById("contact-form");
form.addEventListener("submit", () => {
    // Optional: Show a "submitting" message
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;
});

// --- Contact Form Char Counter ---
const messageInput = document.getElementById("message");
const charCounter = document.getElementById("char-counter");

if (messageInput && charCounter) {
    const maxLength = messageInput.getAttribute("maxlength");
    messageInput.addEventListener("input", () => {
    const remaining = maxLength - messageInput.value.length;
    charCounter.textContent = remaining;
    });
}

// Add tooltips to skills
skills.forEach((skill) => {
    const tooltipText = skill.getAttribute("data-tooltip");
    if (tooltipText) {
    const tooltipElement = document.createElement("span");
    tooltipElement.className = "tooltip";
    tooltipElement.textContent = tooltipText;
    skill.appendChild(tooltipElement);
    }
});
});
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 80;

class Particle {
constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
    this.alpha = Math.random() * 0.5 + 0.3;
}

move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
}

draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 170, 255, ${this.alpha})`;
    ctx.fill();
}
}
function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
particles.forEach((p) => {
    p.move();
    p.draw();
});
requestAnimationFrame(animate);
}

// Init particles
particles = Array.from({ length: particleCount }, () => new Particle());
animate();

// Resize listener
window.addEventListener("resize", () => {
// Original resize logic from user
function resizeCanvas() {
    canvas.width = document.body.scrollWidth;
    canvas.height = document.body.scrollHeight;
}
resizeCanvas();

window.addEventListener("resize", resizeCanvas);
});
        // --- 3D Tilt Effect for Project Cards ---
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -7; // Max rotation 7 degrees
        const rotateY = ((x - centerX) / centerX) * 7; // Max rotation 7 degrees
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});
