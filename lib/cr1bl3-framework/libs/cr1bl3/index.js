import * as THREE from 'three';

export class cr1bl3 {
  constructor(config = {}) {
    // Apply user-provided or default config immutably
    this.config = Object.freeze(this.generateConfig(config));
    this.components = {}; // To store registered components

    // Apply initial utility styles for margins and paddings
    this.applyUtilityStyles();
  }

  // 1. Configuration Generator with Immutability
  generateConfig({ colors = {}, spacing = [] }) {
    const defaultColors = {
      primary: "#007bff",
      secondary: "#6c757d",
      success: "#28a745",
      danger: "#dc3545",
    };
    const defaultSpacing = [0, 4, 8, 16, 32, 64];
    return {
      colors: { ...defaultColors, ...colors },
      spacing: [...defaultSpacing, ...spacing],
    };
  }

  // 2. Utility CSS Class Generators (Pure Functions)
  createMarginClasses(sizes) {
    return sizes.reduce((classes, size) => {
      classes[`.m-${size}`] = { margin: `${size}px` };
      classes[`.mt-${size}`] = { marginTop: `${size}px` };
      classes[`.mb-${size}`] = { marginBottom: `${size}px` };
      return classes;
    }, {});
  }

  createPaddingClasses(sizes) {
    return sizes.reduce((classes, size) => {
      classes[`.p-${size}`] = { padding: `${size}px` };
      classes[`.pt-${size}`] = { paddingTop: `${size}px` };
      classes[`.pb-${size}`] = { paddingBottom: `${size}px` };
      return classes;
    }, {});
  }

  // 3. Apply Utility Styles (CSS-in-JS Approach)
  applyUtilityStyles() {
    const sizes = this.config.spacing;
    const styles = {
      ...this.createMarginClasses(sizes),
      ...this.createPaddingClasses(sizes),
    };
    this.injectStyles(styles);
  }

  // Helper to inject styles into document head
  injectStyles(styles) {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = Object.entries(styles)
      .map(([selector, rules]) => {
        const rulesText = Object.entries(rules)
          .map(([property, value]) => `${property}: ${value};`)
          .join(" ");
        return `${selector} { ${rulesText} }`;
      })
      .join(" ");
    document.head.appendChild(styleSheet);
  }

  // 4. Lazy-Loading Components by Kebab-Case Naming Convention
  async lazyLoadComponent(componentName) {
    const kebabName = componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    const componentPath = `./components/${kebabName}.js`; // Adjust the path for your project structure
    try {
      // Add the @vite-ignore comment to suppress the warning
      return await import(/* @vite-ignore */ componentPath);
    } catch (error) {
      console.error(`Component ${componentName} could not be loaded: ${error.message}`);
      throw error;
    }
  }

  // 5. Auto Load Component
  async autoLoadComponent(componentName) {
    if (!this.components[componentName]) {
      const ComponentModule = await this.lazyLoadComponent(componentName);
      this.components[componentName] = ComponentModule.default; // Store the class itself, not an instance
    }

    const ComponentClass = this.components[componentName];

    // Check if ComponentClass is a function/class
    if (typeof ComponentClass !== 'function') {
      console.error(`${componentName} is not a valid component.`);
      throw new Error(`${componentName} is not a function`);
    }

    // Create and return an instance of the component
    return new ComponentClass(); 
  }

  // 6. Load and Use Component
  async loadAndUseComponent(componentName) {
    try {
      const component = await this.autoLoadComponent(componentName);
      
      // Assuming the component has a render method or is a functional component
      const renderedComponent = component.render ? component.render() : component();
      document.body.appendChild(renderedComponent); // Append the rendered component to the body
    } catch (error) {
      this.handleError(`Failed to load component ${componentName}`, error);
    }
  }

  // 7. Render Components
  async render() {
    const layout = document.createElement('div');
  
    // Create elements using loaded components
    for (const component of this.config.components) {
      const componentInstance = this.components[component.name];
  
      if (typeof componentInstance === 'function') {
        let element;
  
        // Check if the component is a class (constructor function)
        if (componentInstance.prototype && componentInstance.prototype.constructor) {
          element = new componentInstance(component.props); // Instantiate the class with props
        } else {
          element = componentInstance(component.props); // Call the function directly
        }
  
        if (element) {
          layout.appendChild(element); // Append the created element to the layout
        } else {
          console.error(`Component ${component.name} did not return a valid element.`);
        }
      } else {
        console.error(`Component ${component.name} is not a valid function.`);
      }
    }
  
    return layout;
  }

  

  // 8. Templating Function for Dynamic HTML Content
  renderTemplate(template, data) {
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => data[key.trim()] || "");
  }

  // 9. Render Alert Box with a Template
  renderAlert(message) {
    const template = `<div class="alert alert-primary">{{ message }}</div>`;
    return this.renderTemplate(template, { message });
  }

  // 10. Render Button Component with Functional Styling
  renderButton({ text = "Button", variant = "primary", onClick = () => {} }) {
    const button = document.createElement("button");
    button.className = `btn btn-${variant}`;
    button.innerText = text;
    button.onclick = onClick;
    return button;
  }

  // 11. Register Components
  registerComponent(name, component) {
    this.components[name] = component;
  }

  // 12. Dynamic Theming
  changeTheme(theme) {
    // Apply theme logic here, for simplicity, let's log the theme
    console.log(`Theme changed to: ${theme}`);
  }

  // 13. Custom Error Handling
  handleError(message, error) {
    console.error(`${message}\n`, error);
  }

  // 14. Initialize Three.js
  initThreeJS(containerId) {
    const container = document.getElementById(containerId);
    
    // Create a scene
    this.scene = new THREE.Scene();
    
    // Create a camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5; // Set camera position
    
    // Create a renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement); // Append renderer to the container

    // Start rendering loop
    this.animate();
  }

  // 15. Animate the Three.js Scene
  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  // 16. Add a Simple Shape (e.g., Cube)
  addCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube); // Add cube to the scene
  }
}