// src/components/title-component.js

export default function TitleComponent({ title }) {
  const titleElement = document.createElement("h1");
  titleElement.innerText = title;
  return titleElement;
}