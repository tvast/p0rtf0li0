const fs = require('fs');
const path = require('path');

// Path to your artwork folder
const artFolder = path.join(__dirname, 'art');

// Read image files in the folder
const files = fs.readdirSync(artFolder).filter(file =>
  file.match(/\.(jpg|jpeg|png|gif)$/i)
);

// Build the JSON structure
const galleryJson = {
  gallery: {
    title: "Galerie Foldscroll d'art",
    imageCount: files.length,
    imagePathTemplate: "art/{index}.jpeg",
    items: files.map((file, i) => {
      const index = i + 1;
      return {
        index,
        title: `Nom de l'événement ${index}`,
        description: `Description de l'événement ${index}`,
        buttons: [
          { label: "Réserver", class: "button" },
          { label: "Acheter", class: "button2" }
        ]
      };
    }),
    foldScrollOptions: {
      perspective: 900,
      shading: "rgba(0,0,0,0.2)",
      margin: 0.6
    }
  }
};

// Output path for the generated JSON
const outputPath = path.join(__dirname, 'gallery.json');

// Write the JSON to file
fs.writeFileSync(outputPath, JSON.stringify(galleryJson, null, 2), 'utf-8');

console.log(`✅ Gallery JSON generated at ${outputPath}`);
