// src/components/title.js
// libs/cr1bl3/components/title.js
export default function T1TLE({ title }) {
    const titleElement = document.createElement('h1');
    titleElement.innerText = title;
    return titleElement;
  }