const events = [/* paste your JSON array here */];

const container = document.getElementById('events');

events.forEach(event => {
  const card = document.createElement('div');
  card.className = 'event-card';

  const title = document.createElement('h2');
  title.textContent = event.title;

  const description = document.createElement('p');
  description.textContent = event.description;

  const img = document.createElement('img');
  img.src = `images/${event.image}.jpg`; // assumes image path like 'images/1.jpg'
  img.alt = event.title;

  const buttonsContainer = document.createElement('div');
  event.buttons.forEach(btn => {
    const button = document.createElement('button');
    button.className = btn.class;
    button.textContent = btn.label;
    buttonsContainer.appendChild(button);
  });

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(buttonsContainer);
  container.appendChild(card);
});
