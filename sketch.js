let cells = [];
// This is our "window" of cells.
let history = [];
let palette = [];
let ruleSet;
let w = 4;
let ruleCollection = [9, 30, 45, 58, 60, 69, 105, 110, 129, 169, 182, 195, 219, 225];


function chooseRuleSet(n) {
  return parseInt(n, 10).toString(2).padStart(8, "0");
}

function setup() {
  // We want an odd # of cells.
  createCanvas(710, 500);
  background(220);
  ruleSet = chooseRuleSet(random(ruleCollection))
  let total = width / w;
  palette = [
    color('#a62639'), // Auburn (Dark pink)
    color('#adf5ff'), // Celeste (light blue)
    color('#0075a2'), // Cerulean
    color('#ec9f05'), // Gamboge (Burnt Yellow)
    color('#8f250c'), // Sienna
    color('#eccbd9'), // Rogueish Purple
    color('#574b60'), // Pallid Purple
    color('#f79f79'), // Burnt Orange
    color('#5b5941'), // Drab Olive
    color('#43c59e')  // Mint
  ];

  for (let i = 0; i < total; i++) {
    cells[i] = random(palette);
  }
}

function draw() {
  history.push(cells);

  // Drawing logic.
  let y = 0;
  background(255);
  for(let cells of history) {
    for (let i = 0; i < cells.length; i++) {
      let x = i * w;
      noStroke();
      fill(cells[i]);
      square(x, y - w, w);
    }
    y += w;
  }

  // Rule-change logic. After ~100 generations.
  if (random(1) < 0.01) {
    ruleSet = chooseRuleSet(random(ruleCollection));
    // Must return to elementary position to prevent "voiding out".
    cells[floor(cells.length/2)] = random(palette);
  }

  // Infinite Scroll logic.
  let rows = height/w;
  if (history.length > rows + 1) {
    // Pop from front of array once we fill up screen.
    history.splice(0, 1);
  }

  // Next-generation logic.
  let nextCells = [];
  for (let i = 0; i < cells.length; i++) {
    // Wrap-around by modding & adding size of array
    let leftColor = cells[(i - 1 + cells.length) % cells.length];
    let rightColor = cells[(i + 1 + cells.length) % cells.length];
    let stateColor = cells[i];

    // State logic. Checks if cell is white or not.
    let left = brightness(leftColor) < 100 ? 1 : 0;
    let right = brightness(rightColor) < 100 ? 1 : 0;
    let state = brightness(stateColor) < 100 ? 1 : 0;

    let newState = calculateState(left, state, right);

    if (newState == 0) {
      nextCells[i] = color(255);
    } else {
      // Construct possible colors from neighbors.
      let options = [];
      if (left == 1) options.push(leftColor);
      if (right == 1) options.push(rightColor);
      if (state == 1) options.push(stateColor);
      if (options.length < 1) nextCells[i] = random(palette);
      else nextCells[i] = random(options);
    }
  }

  cells = nextCells;
}

function calculateState(a, b, c) {
  let neighborhood = '' + a + b + c;
  // Subtract from 7 so '111' is the first in array, b '000' is the last.
  let value = 7 - parseInt(neighborhood, 2);
  return ruleSet[value]
}