const colorPickerContainer = document.getElementById("color-picker-container");
const pixelsContainer = document.getElementById("pixels-container");
const quantityOfPixelsInput = document.getElementById("quantity-of-pixels");
const sizeOfPixelInput = document.getElementById("size-of-pixel");
const clearButton = document.getElementById("clear-button");
const gridToggleButton = document.getElementById("grid-toggle-button");

const colors = {
  white: "#ffffff",
  black: "#000000",
  red: "#ff0000",
  orange: "#ffa500",
  yellow: "#ffff00",
  green: "#008000",
  cyan: "#00ffff",
  blue: "#0000ff",
  purple: "#800080",
  pink: "#ffc0cb",
};

let pixelSize = parseInt(sizeOfPixelInput.value) || 20;
let quantityOfPixels = parseInt(quantityOfPixelsInput.value) || 10;
let selectedColor = colors["black"];
let gridVisible = true;

function setSquaredSize(element, size) {
  element.style.height = size + "px";
  element.style.width = size + "px";
}

function createPixel(pixelSize) {
  const pixel = document.createElement("div");
  setSquaredSize(pixel, pixelSize);
  pixel.classList.add("pixel");
  pixel.addEventListener(
    "click",
    () => (pixel.style.backgroundColor = selectedColor)
  );
  return pixel;
}

function createRow(quantityOfPixels, gridSize, pixelSize) {
  const row = document.createElement("div");
  row.style.width = gridSize + "px";
  row.style.height = pixelSize + "px";
  row.classList.add("row");

  for (let columnIndex = 0; columnIndex < quantityOfPixels; columnIndex++) {
    const pixel = createPixel(pixelSize);
    if (!gridVisible) pixel.classList.add("no-border");
    row.appendChild(pixel);
  }
  return row;
}

function createColorPickerContainer(colorPickerContainer, colors) {
  for (const colorName in colors) {
    const colorPick = document.createElement("div");
    setSquaredSize(colorPick, 20);
    colorPick.style.backgroundColor = colors[colorName];
    colorPick.classList.add("color-pick");

    colorPick.addEventListener("click", () => {
      selectedColor = colors[colorName];

      document.querySelectorAll(".color-pick").forEach((el) => {
        el.classList.remove("selected-color");
      });

      colorPick.classList.add("selected-color");
    });

    colorPickerContainer.appendChild(colorPick);
  }
}

function createPixelsContainer(pixelsContainer, quantityOfPixels, pixelSize) {
  const gridSize = quantityOfPixels * pixelSize;
  setSquaredSize(pixelsContainer, gridSize);

  for (let rowIndex = 0; rowIndex < quantityOfPixels; rowIndex++) {
    const row = createRow(quantityOfPixels, gridSize, pixelSize);
    pixelsContainer.appendChild(row);
  }
}

function refreshPixelsContainer() {
  pixelsContainer.innerHTML = "";
  createPixelsContainer(pixelsContainer, quantityOfPixels, pixelSize);
}

function clearPixels() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => (pixel.style.backgroundColor = ""));
}

function toggleGrid() {
  gridVisible = !gridVisible;
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) =>
    gridVisible
      ? pixel.classList.remove("no-border")
      : pixel.classList.add("no-border")
  );
}

window.addEventListener("load", () => {
  createColorPickerContainer(colorPickerContainer, colors);
  createPixelsContainer(pixelsContainer, quantityOfPixels, pixelSize);

  document
    .querySelector(`.color-pick[style="background-color: ${selectedColor};"]`)
    .classList.add("selected-color");
});

quantityOfPixelsInput.addEventListener("change", (e) => {
  quantityOfPixels = parseInt(e.target.value);
  refreshPixelsContainer();
});

sizeOfPixelInput.addEventListener("change", (e) => {
  pixelSize = parseInt(e.target.value);
  refreshPixelsContainer();
});

clearButton.addEventListener("click", clearPixels);
gridToggleButton.addEventListener("click", toggleGrid);
