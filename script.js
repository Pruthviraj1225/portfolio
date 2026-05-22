// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Fetch and display projects (on projects page)
async function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        
        if (projects.length === 0) {
            grid.innerHTML = '<p class="loading">No projects found.</p>';
            return;
        }
        
        grid.innerHTML = projects.map((project, index) => `
            <div class="project-card" style="animation-delay: ${index * 0.1}s">
                <img src="${project.imageUrl}" alt="${project.title}" class="project-image" onerror="this.src='https://via.placeholder.com/400x250?text=${encodeURIComponent(project.title)}'">
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="tech-tags">
                        ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
        grid.innerHTML = '<p class="loading">Failed to load projects. Please make sure the backend server is running.</p>';
    }
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.education-card, .skill-item, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Load projects when DOM is ready
document.addEventListener('DOMContentLoaded', loadProjects);