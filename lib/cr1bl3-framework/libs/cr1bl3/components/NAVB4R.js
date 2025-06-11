// src/components/navb4r.js
export default function NAVB4R({ links }) {
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');
if (links)
  links.forEach(link => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.href;
    a.innerText = link.text;
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  return nav;
}