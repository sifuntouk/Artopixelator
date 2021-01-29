// Na ftiaxw ena function na kanei reset to isDrawing otan to pontiki vgenei apexw apo to pad

let gridSize = 16;
let isDrawing = false;
let pixelColor = '#000000';
let pixelBackgroundColor = '#ffffff';

// Converts to hex the value which for some fucking reason the style.backgroundColor returns as Rgb
// https://stackoverflow.com/questions/11670019/does-object-style-color-only-return-rgb
function convertRgbToHex(e) {
  const rgb = getComputedStyle(e).backgroundColor.match(/\d+/g);
  const r = parseInt(rgb[0]).toString(16);
  const g = parseInt(rgb[1]).toString(16);
  const b = parseInt(rgb[2]).toString(16);
  return `#${r}${g}${b}`;
}

// Get all the grid pixels, and change the color only to unchanged pixels
// pixels current bckgrd color value should be hex for the comparison to work
// Set the grid background color to the color picker
function pickBackgroundDrawingColor() {
  let pixel = Array.from(document.querySelectorAll('.padPixel'));
  pixel = pixel.filter((e) => convertRgbToHex(e) === pixelBackgroundColor);
  pixel.forEach((e) => (e.style.backgroundColor = this.value));
  pixelBackgroundColor = this.value;
}

// Add  change  event listener on background coloring color picker
const backgroundColorBtn = document.getElementById('backgroundColorBtn');
backgroundColorBtn.value = '#ffffff';
backgroundColorBtn.addEventListener('change', pickBackgroundDrawingColor);

function pickDrawingColor() {
  pixelColor = this.value;
}

// Set the value of color picker to black
// Add event listener to
const colorBtn = document.getElementById('colorBtn');
colorBtn.value = '#000000';
colorBtn.addEventListener('change', pickDrawingColor);

// Helping to color pixel on click and then setting
// the pixel color so mouseover coloring can take over
function pressButton() {
  isDrawing = true;
  this.style.backgroundColor = pixelColor;
}
// Setting the variable to false so mouseover stops
function releaseButton() {
  isDrawing = false;
}

// Event listener added on window so it is registered even
// the mouse pointer end up outside the grid
window.document.addEventListener('mouseup', releaseButton);

// Change the grid pixel color
function changePixelColor() {
  if (isDrawing) {
    this.style.backgroundColor = pixelColor;
  }
}
// Change the grid pixel dimentions according to grid size
function updatePixelSize() {
  const pixel = document.querySelectorAll('.padPixel');
  pixel.forEach((e) => (e.style.width = `${100 / gridSize}%`));
  pixel.forEach((e) => (e.style.height = `${100 / gridSize}%`));
}

// Add event listeners on all pixels of the grid
function addPixelEventListeners() {
  const pixel = document.querySelectorAll('.padPixel');
  pixel.forEach((e) => e.addEventListener('mouseover', changePixelColor));
  pixel.forEach((e) => e.addEventListener('mousedown', pressButton));
}

// Remove previous grid pixels (if any)
// Make the grid and call a function for pixel size update
// and another to attach the event listeners
function makeGrid() {
  const pad = document.getElementById('pad');
  const pixel = document.querySelectorAll('.padPixel');
  pixel.forEach((e) => e.remove());
  for (let i = 1; i <= gridSize * gridSize; i += 1) {
    const div = document.createElement('div');
    div.classList.add('padPixel');
    div.style.backgroundColor = pixelBackgroundColor;
    pad.appendChild(div);
  }
  updatePixelSize();
  addPixelEventListeners();
}

// Update the value and call for grid size update
function getSelection() {
  gridSize = this.value;
  makeGrid();
}

// Get the selector,
// set the intial selection to 16 for reset on page refresh
// add event listener to selection button and call a getSelector
const gridSizeSelector = document.getElementById('gridSelector');
gridSizeSelector.value = '16';
gridSizeSelector.addEventListener('change', getSelection);

// Select the eraseBtn
const eraseBtn = document.getElementById('eraseBtn');
// Toggle the drawing color between background and drawing colors
function erase() {
  if (pixelColor !== pixelBackgroundColor) {
    eraseBtn.classList.add('btnActive');
    pixelColor = pixelBackgroundColor;
  } else {
    eraseBtn.classList.remove('btnActive');
    pixelColor = colorBtn.value;
  }
}
// Add  click event listener on clear button
eraseBtn.addEventListener('click', erase);

// Slect the grid line color button
// Set the initial valie to light gray
const gridLineColor = document.getElementById('gridColorBtn');
gridLineColor.value = '#D3D3D3';
// change the outline color of each pixel
function changeGridColor() {
  const pixel = document.querySelectorAll('.padPixel');
  pixel.forEach((e) => (e.style.outlineColor = gridLineColor.value));
}
// Add event listener to the gid line color picker
gridLineColor.addEventListener('change', changeGridColor);

// Slect the grid button
const gridBtn = document.getElementById('gridBtn');
// Toggle the class of grid pixels to hide or show the grid lines
// and toggles the button class to mark it as active or not
function gridHide() {
  const pixel = document.querySelectorAll('.padPixel');
  pixel.forEach((e) => e.classList.toggle('padPixelNoGrid'));
  gridBtn.classList.toggle('btnActive');
}
// Add event listener on grid hide button
gridBtn.addEventListener('click', gridHide);

// Clears the grid pad
function clear() {
  const pixel = document.querySelectorAll('.padPixel');
  pixel.forEach((e) => (e.style.backgroundColor = pixelBackgroundColor));
}

// Add  click event listener on clear button
const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', clear);

makeGrid();
