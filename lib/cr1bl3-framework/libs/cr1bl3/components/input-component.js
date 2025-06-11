// src/components/input-component.js

export default function InputComponent({ placeholder, onInput }) {
  const input = document.createElement("input");
  input.placeholder = placeholder;
  input.addEventListener("input", () => onInput(input.value));
  return input;
}