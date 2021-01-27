// Initiate grid size variable 32 x 32
const gridSize = 32;
const pad = document.getElementById('pad');
let isDrawing = false;

function pressButton() {
  isDrawing = true;
  this.style.backgroundColor = 'black';
}

function releaseButton() {
  isDrawing = false;
}
// Change the grid pixel color
function changePixelColor() {
  if (isDrawing) {
    this.style.backgroundColor = 'black';
  }
}
// Change the grid pixel dimentions according to grid size
function updatePixelSize() {
  const pixel = Array.from(document.querySelectorAll('.padPixel'));
  pixel.forEach((e) => (e.style.width = `${100 / gridSize}%`));
  pixel.forEach((e) => (e.style.height = `${100 / gridSize}%`));
}

// Add event listeners on all pixels of the grid
function addPixelEventListeners() {
  const pixel = Array.from(document.querySelectorAll('.padPixel'));
  pixel.forEach((e) => e.addEventListener('mouseover', changePixelColor));
  pixel.forEach((e) => e.addEventListener('mousedown', pressButton));
  pixel.forEach((e) => e.addEventListener('mouseup', releaseButton));
}

// Make the grid and call a function for pixel update and another to attach the event listeners
function makeGrid() {
  for (let i = 1; i <= gridSize * gridSize; i += 1) {
    const div = document.createElement('div');
    div.classList.add('padPixel');
    div.setAttribute('id', `${i}`);
    pad.appendChild(div);
  }
  updatePixelSize();
  addPixelEventListeners();
}

makeGrid();
