// src/index.js
import Router from './router.js';

// Define routes with lazy loading
Router.route('/', () => import('../components/Home.js'));
Router.route('/about', () => import('../components/About.js'));

// Initial navigation to the home page
Router.navigate('/');

// Simplified navigation handling
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    const path = link.getAttribute('href'); // Get the href attribute
    Router.navigate(path); // Navigate using the router
  });
});