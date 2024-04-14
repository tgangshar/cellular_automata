let cells = [];
let w = 4;
let y = 0;

function setup() {
  // We want an odd # of cells.
  createCanvas(710, 1800);
  background(220);
  let total = width / w;
  for (let i = 0; i < total; i++) {
    cells[i] = 0
  }
  cells[floor(total/2)] = 1
}

function draw() {
  for (let i = 0; i < cells.length; i++) {
    let x = i * w;
    noStroke();
    // 1 is Black. 0 is White.
    fill(255 - cells[i] * 255);
    square(x, y, w);
  }
  // Go to next row.
  y += w;

  
  let nextCells = [];
  for (let i = 0; i < cells.length; i++) {
    // Wrap-around by modding & adding size of array
    let left = cells[(i - 1 + cells.length) % cells.length];
    let right = cells[(i + 1 + cells.length) % cells.length];
    let state = cells[i]
  
    let newState = calculateState(left, state, right);
    nextCells[i] = newState;
  }

  cells = nextCells;
}

function chooseRuleSet(n) {
  return parseInt(n, 10).toString(2).padStart(8, "0");
}

function calculateState(a, b, c) {
  // Sierpinski Fractal Triangle. Rule 182
  // let ruleSet = chooseRuleSet(182)
  let ruleSet = chooseRuleSet(110);

  let neighborhood = '' + a + b + c;
  // Subtract from 7 so '111' is the first in array, b '000' is the last.
  let value = 7 - parseInt(neighborhood, 2);
  return ruleSet[value]
}