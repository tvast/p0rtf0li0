// C0NT3NT.js
export default function createC0NT3NT(props) {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.border = '1px solid #ccc';
    container.style.borderRadius = '5px';
    container.style.margin = '10px 0';
  
    // Create title
    const title = document.createElement('h2');
    title.textContent = props.title || 'Default Title'; // Default title if none provided
    container.appendChild(title);
  
    // Create paragraph with Lorem Ipsum text
    const paragraph = document.createElement('p');
    paragraph.textContent = generateLoremIpsum(5); // Generate 5 sentences of Lorem Ipsum
    container.appendChild(paragraph);
  
    return container;
  }
  
  function generateLoremIpsum(numSentences) {
    const loremSentences = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ];
  
    let result = '';
    for (let i = 0; i < numSentences; i++) {
      const randomIndex = Math.floor(Math.random() * loremSentences.length);
      result += loremSentences[randomIndex] + ' ';
    }
    return result.trim(); // Return trimmed text
  }