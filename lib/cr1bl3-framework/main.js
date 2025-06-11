// src/main.js
import createLayout from './libs/cr1bl3/components/layouts/l4yout.js';
import router from './libs/cr1bl3/Router.js';

async function initLayout() {
  const layout = await createLayout(); // Ensure layout is loaded once
  const appRoot = document.getElementById('app');
  appRoot.innerHTML = ''; // Clear any existing content
  appRoot.appendChild(layout);
  console.log("Layout rendered successfully.");
}

// Initial setup
async function initApp() {
  await initLayout();
  router.setupLinkNavigation(); // Set up link-based navigation
  router.navigate('/h0M3'); // Start with the home page or default page
}

initApp();