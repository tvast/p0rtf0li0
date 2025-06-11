export default function About() {
    const element = document.createElement('div');
    element.innerHTML = '<h1>About Page</h1><p>This is the About Page.</p>';
    
    return {
      render: () => element,
      destroy: () => {
        // Cleanup if necessary
        console.log('About component destroyed');
      }
    };
  }