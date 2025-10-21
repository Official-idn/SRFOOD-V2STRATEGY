// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });
}

// Lazy loading for background images (if any images are added later)
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Dynamic content loading (for recipes if added later)
const loadDynamicContent = async () => {
    try {
        const response = await fetch('recipes.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const recipesElement = document.getElementById('recipes');
        if (recipesElement) {
            recipesElement.innerHTML = data.map(recipe => `<p>${recipe.title}</p>`).join('');
        }
    } catch (error) {
        console.error('Error loading dynamic content:', error);
    }
};

// Load dynamic content when DOM is ready
document.addEventListener('DOMContentLoaded', loadDynamicContent);