function createGridInnerLayer() {
    let innerGridContainer = document.createElement(`div`);
    innerGridContainer.classList.add(`inner_grid_container`);
    return innerGridContainer;
}

function createBox() {
    let box = document.createElement(`div`);
    box.classList.add(`box`);
    return box;
}

function createRandomValue(max) {
    return Math.round(max * Math.random());
}

function createRandomColor() {
    let h = createRandomValue(360);
    let s = createRandomValue(100);
    let l = createRandomValue(100);
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function generateRandomColor(hsl) {
    if (hsl[2] > 0) {
        hsl[2] -= 10;
        if (hsl[2] < 0) {
            hsl[2] = 0;
        }
    }
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
}

function rgbToHsl(rgb){
    r = rgb[0] / 255;
    g = rgb[1] / 255;
    b = rgb[2] / 255;

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s * 100, l * 100];
}

function getRGB(colorString) {
    return colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,/);
}

function changeBoxColor(e) {
    let box = e.target;
    let color = box.style.backgroundColor;
    if (!color && colorBlack) {
        color = `black`;
    } else if (!colorBlack) {
        if (!color) {
            color = createRandomColor();
        } else {
            color = getRGB(color);
            console.log(color[2]);
            color = generateRandomColor(rgbToHsl(color));
        }
    }

    box.style.backgroundColor = color;
}

function listenToBoxes() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => 
        box.addEventListener(`mouseover`, changeBoxColor));
}

function createEtchASketch(dim) {
    for (let i = 0; i < dim; i++) {
        let innerLayer = createGridInnerLayer();
        outerGridContainer.appendChild(innerLayer);
        for (let j = 0; j < dim; j++) {
            let box = createBox();
            innerLayer.appendChild(box);
        }
    }

    listenToBoxes();
}

function clearGrid() {
    let length = outerGridContainer.childNodes.length;
    for (let i = 0; i < length; i++) {
        outerGridContainer.removeChild(outerGridContainer.childNodes[0]);
    }
}

function reset() {
    let desiredGrimDim = prompt(`Enter grid dimensions(dimxdim):`, `16`);
    let grimDim = parseInt(desiredGrimDim);
    if (grimDim && grimDim > 0) {
        clearGrid();
        createEtchASketch(grimDim);
    } else if (desiredGrimDim !== null) {
        alert(`${desiredGrimDim} is not a valid input.`)
    }
}

function toggleColors() {
    let buttonColor;
    colorBlack = !colorBlack;
    if (colorBlack) {
        buttonColor = `rgba(0, 0, 0, .25)`;
    } else {
        buttonColor = `rgba(3, 217, 224, 1.0)`;
    }
    console.log(buttonColor);
    colorButton.style.backgroundColor = buttonColor;
}

const outerGridContainer = document.querySelector(`.outer_grid_container`);
const resetButton = document.querySelector(`.reset`);
const colorButton = document.querySelector(`.color`);

let colorBlack = true;

createEtchASketch(16);
resetButton.addEventListener(`click`, () =>
    reset());
colorButton.addEventListener('click', () =>
    toggleColors());
