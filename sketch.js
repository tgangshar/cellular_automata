let cells = [];
// This is our "window" of cells.
let history = [];
let w = 4;

let ruleCollection = [1, 9, 30, 45, 58, 60, 69, 105, 110, 129, 169, 182, 195, 219]

function setup() {
  // We want an odd # of cells.
  createCanvas(710, 500);
  background(220);
  let total = width / w;
  for (let i = 0; i < total; i++) {
    cells[i] = 0
  }
  cells[floor(total/2)] = 1
}

function draw() {
  history.push(cells);

  // Rule-change logic here.

  // Infinite Scroll logic.
  let rows = height/w;
  if (history.length > rows + 1) {
    // Pop from front of array once we fill up screen.
    history.splice(0, 1);
  }

  // Drawing logic.
  let y = 0;
  background(255);
  for(let cells of history) {
    for (let i = 0; i < cells.length; i++) {
      let x = i * w;
      if (cells[i] == 1) {
        noStroke();
        // 1 is Black. 0 is White.
        fill(255 - cells[i] * 255);
        square(x, y - w, w);
      }
    }
    y += w;
  }

  // Next-generation logic.
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
  // Textile Cone Snail Shell. Rule 110.
  let ruleSet = chooseRuleSet(110);

  let neighborhood = '' + a + b + c;
  // Subtract from 7 so '111' is the first in array, b '000' is the last.
  let value = 7 - parseInt(neighborhood, 2);
  return ruleSet[value]
}