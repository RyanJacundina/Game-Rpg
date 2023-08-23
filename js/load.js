var packImage;
var modalImage;
var groundImage;
var effectsImage;
var charactersImage;
var mapImage;

// Create a function to load an image and return a promise
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// List of image paths
const imagePaths = [
  "assets/gui/pack.png",
  "assets/modal.png",
  "assets/ground.png",
  "assets/effects.png",
  "assets/characters/pack.png",
  "assets/maps/map.png"
];

// Load all images and wait for all promises to resolve
Promise.all(imagePaths.map(loadImage))
  .then(images => {
    console.log("All images loaded");

    // Access the loaded images
        packImage = images[0];
        modalImage = images[1];
        groundImage = images[2];
        effectsImage = images[3];
        charactersImage = images[4];
        mapImage = images[5];
    // ... and so on for other images

    // Call the loop function and pass the loaded images if needed
    createMaps();
    loop();
  })
  .catch(error => {
    console.error("Error loading images:", error);
  });
