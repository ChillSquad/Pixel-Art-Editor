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
  pixel.addEventListener("click", () => {
    pixel.style.backgroundColor = selectedColor;
  });
  return pixel;
}

function getAlphabetLetter(index) {
  return String.fromCharCode(65 + index);
}

function createPixelsContainer(pixelsContainer, quantityOfPixels, pixelSize) {
  pixelsContainer.innerHTML = "";
  const gridSize = quantityOfPixels * pixelSize;

  const headerRow = document.createElement("div");
  headerRow.classList.add("row");
  headerRow.style.width = gridSize + pixelSize + "px";

  const emptyCorner = document.createElement("div");
  setSquaredSize(emptyCorner, pixelSize);
  emptyCorner.classList.add("header-cell");
  headerRow.appendChild(emptyCorner);

  for (let i = 0; i < quantityOfPixels; i++) {
    const headerCell = document.createElement("div");
    headerCell.classList.add("header-cell");
    headerCell.textContent = i + 1;
    setSquaredSize(headerCell, pixelSize);
    headerRow.appendChild(headerCell);
  }

  pixelsContainer.appendChild(headerRow);

  for (let rowIndex = 0; rowIndex < quantityOfPixels; rowIndex++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.style.width = gridSize + pixelSize + "px";

    const rowHeader = document.createElement("div");
    rowHeader.classList.add("header-cell");
    rowHeader.textContent = getAlphabetLetter(rowIndex);
    setSquaredSize(rowHeader, pixelSize);
    row.appendChild(rowHeader);

    for (let columnIndex = 0; columnIndex < quantityOfPixels; columnIndex++) {
      const pixel = createPixel(pixelSize);
      if (!gridVisible) pixel.classList.add("no-border");
      row.appendChild(pixel);
    }

    pixelsContainer.appendChild(row);
  }
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
  const inputValue = parseInt(e.target.value);

  if (inputValue > 26) {
    quantityOfPixelsInput.value = 26;
    quantityOfPixels = 26;
  } else {
    quantityOfPixels = inputValue;
  }

  refreshPixelsContainer();
});

sizeOfPixelInput.addEventListener("change", (e) => {
  inputValue = parseInt(e.target.value);

  if (inputValue < 20) {
    sizeOfPixelInput.value = 20;
    pixelSize = 20;
  } else {
    pixelSize = inputValue;
  }

  refreshPixelsContainer();
});

clearButton.addEventListener("click", clearPixels);
gridToggleButton.addEventListener("click", toggleGrid);
