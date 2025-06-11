// src/Router.js
import createLayout from './components/layouts/l4yout.js';

class Router {
  constructor() {
    this.routes = {};
    this.currentComponent = null;
  }

  // Register routes dynamically
  async loadComponents() {
    const componentFiles = import.meta.glob('./components/*.js');
    
    for (const path in componentFiles) {
      const componentName = path.split('/').pop().replace('.js', '');
      this.registerRoute(`/${componentName.toLowerCase()}`, componentFiles[path]);
    }
  }

  registerRoute(path, componentLoader) {
    this.routes[path] = componentLoader;
  }

  async navigate(path) {
    const componentLoader = this.routes[path];
    if (!componentLoader) {
      console.error(`Route for path "${path}" not found.`);
      return;
    }

    try {
      if (this.currentComponent && this.currentComponent.destroy) {
        this.currentComponent.destroy();
      }

      const { default: Component } = await componentLoader();
      const newComponent = Component();
      const contentArea = document.getElementById('content');
      
      contentArea.innerHTML = '';
      contentArea.appendChild(newComponent.render());

      this.currentComponent = newComponent;
      console.log(`Navigated to ${path}`);
    } catch (error) {
      console.error(`Failed to load component for path "${path}":`, error);
    }
  }

  setupLinkNavigation() {
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const path = link.getAttribute('href');
        this.navigate(path);
      });
    });
  }
}

const router = new Router();
await router.loadComponents();
export default router;