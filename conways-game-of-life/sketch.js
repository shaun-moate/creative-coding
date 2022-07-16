let world;
let worldHeight = 720;
let worldWidth = 600;
let cellSize = 5;
let worldCols = worldHeight / cellSize;
let worldRows = worldWidth / cellSize;

function setup() {
  // establish large enough canvas for world ( + wiggle room )
  createCanvas(worldHeight + 5, worldWidth + 5);
  frameRate(10);

  createEmptyArrays();
  startGame();
}

function createEmptyArrays() {
  // set up empty 2D arrays world and nextWorld
  world = new Array(worldCols);
  for (let cols = 0; cols < worldCols; cols++) {
    world[cols] = new Array(worldRows);
  }
  nextWorld = new Array(worldCols);
  for (let cols = 0; cols < worldCols; cols++) {
    nextWorld[cols] = new Array(worldRows);
  }
}

function startGame() {
  // set-up initial world with 2D array of cells
  for (let cols = 0; cols < worldCols; cols++) {
    for (let rows = 0; rows < worldRows; rows++) {
      if ( cols === 0 || cols === worldCols-1 || rows === 0 || rows === worldRows-1 ) world[cols][rows] = 0;
      else world[cols][rows] = floor(random(2));
    }
  }
}

// utlity to restart game of life on mouse press
function mousePressed() {
  startGame();
}

function draw() {
  // calculate next generation
  nextGeneration();

  // display alive cells in current world state
  for (let cols = 0; cols < worldCols; cols++) {
    for (let rows = 0; rows < worldRows; rows++) {
      if (world[cols][rows] === 1) fill('#1d3557');
      else fill('#f1faee');
      noStroke();
      rect(cols * cellSize, rows * cellSize, cellSize, cellSize)
    }
  }
}

function nextGeneration() {
  // loop through each cell excluding cells on borders
  for (let cols = 1; cols < worldCols-1; cols++) {
    for (let rows = 1; rows < worldRows-1; rows++) {
      // reset neighbour alive count and check neighbours state
      let nearbyAlive = 0;

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          nearbyAlive += world[cols+x][rows+y];
        }
      }

      // remove world[cols][rows] own alive state
      nearbyAlive -= world[cols][rows];

      // implement conway's rules
      if      ((world[cols][rows] == 1) && (nearbyAlive < 2))  nextWorld[cols][rows] = 0;
      else if ((world[cols][rows] == 1) && (nearbyAlive > 3))  nextWorld[cols][rows] = 0;
      else if ((world[cols][rows] == 0) && (nearbyAlive == 3)) nextWorld[cols][rows] = 1;
      else                                                     nextWorld[cols][rows] = world[cols][rows];

    }
  }

  let temp = world;
  world = nextWorld;
  nextWorld = temp;

}
