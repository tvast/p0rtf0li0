// src/components/layouts/l4yout.js
import router from '../../Router.js';

export default async function createLayout() {
  const layout = document.createElement('div');

  const nav = document.createElement('nav');
  const routes = Object.keys(router.routes); // Get registered route paths

  routes.forEach(route => {
    const menuItem = document.createElement('a');
    menuItem.href = route;
    menuItem.textContent = route.replace('/', '').toUpperCase(); // Format text
    nav.appendChild(menuItem);
  });

  layout.innerHTML = `
    <header>
      <h1>My Application</h1>
    </header>
    <main id="content"></main>
    <footer>
      <!-- Footer content -->
    </footer>
  `;
  layout.prepend(nav); // Add navigation at the top

  return layout;
}