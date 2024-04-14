let cells = []
let w = 2;
let y = 0;

function setup() {
  // We want an odd # of cells.
  createCanvas(700, 410);
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
    let left, right;
    let state = cells[i]
    
    // Wrap-Around logic.
    if (i != 0) {
      left = cells[i - 1];
    } else {
      left = cells[cells.length - 1];
    }
    if (i != cells.length - 1) {
      right = cells[i + 1];
    } else {
      right = cells[0];
    }
  
    let newState = calculateState(left, state, right);
    nextCells[i] = newState;
  }

  cells = nextCells;
}

// Wolfram ruleset. Rule 182. Sierpinski Fractal Triangle
function calculateState(a, b, c) {
  if (a == 1 && b == 1 && c == 1) return 1;
  if (a == 1 && b == 1 && c == 0) return 0;
  if (a == 1 && b == 0 && c == 1) return 1;
  if (a == 1 && b == 0 && c == 0) return 1;
  if (a == 0 && b == 1 && c == 1) return 0;
  if (a == 0 && b == 1 && c == 0) return 1;
  if (a == 0 && b == 0 && c == 1) return 1;
  if (a == 0 && b == 0 && c == 0) return 0;
}