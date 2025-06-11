// src/components/Home.js
export default function Home() {
  // Create the main element for the component
  const element = document.createElement('div');
  
  // Add content to the element
  element.innerHTML = `
    <h1>Home Page</h1>
    <p>Welcome to the Home Page!</p>
    <p>This is where you'll find the latest updates and features.</p>
    <p>Feel free to explore and discover more about our offerings.</p>
  `;
  
  // Optional: Add styles to the component
  element.style.padding = '20px';
  element.style.backgroundColor = '#f9f9f9';
  element.style.color = '#333';
  
  // Return an object with render and destroy methods
  return {
    render: () => element,
    destroy: () => {
      // Cleanup if necessary, e.g., remove event listeners
      console.log('Home component destroyed');
    }
  };
}