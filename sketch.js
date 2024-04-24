const WIDTH = 640
const HEIGHT = 640
const RES = 8

// 640/8 = 40 -> 80 
// espera uma imagem 80x80

let image

let slider
let grid
let cols
let rows

function setup() {
  createCanvas(WIDTH, HEIGHT)
  frameRate(1)
  cols = floor(width / RES)
  rows = floor(height / RES)
  
  grid = makeMatrix(cols, rows)
  
  slider = createSlider(1,60,1);
  slider.position(WIDTH - 200, HEIGHT + 10);
  slider.style('width', '200px');
}

function draw() {
  background(0)
  frameRate(slider.value());
  
  for (let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      grid[i][j].show()
      
      let neighbors = countNeighbors(i, j)

      grid[i][j].updateState(neighbors)
    }
  }
  
}

function preload() {
  image = loadImage("pv80.jpg");
}

const TRESH = 140

function makeMatrix(cols, rows){
  let arr = new Array(cols)
  
  let w = width / 80;
  let h = height / 80;
  image.loadPixels();
  for (let i = 0; i < 80; i++) {
    arr[i] = new Array(rows)
    
    for (let j = 0; j < 80; j++) {
      const pixelIndex = (i + j * image.width) * 4;
      const r = image.pixels[pixelIndex + 0];
      const g = image.pixels[pixelIndex + 1];
      const b = image.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      
      noStroke();
      
      let state = 0
      
      if(avg > TRESH){
        state = 1
      }
        
      arr[i][j] = new Cell(state, i*RES, j*RES, RES)
    }
  }
  
  return arr
}

function countNeighbors(x, y){
  let sum = 0
  
  for (let i = -1; i < 2; i++){
    for(let j = -1; j < 2; j++){
      if(i === 0 && j === 0){
        continue
      }
        
      let col = (x + i + cols) % cols
      let row = (y + j + rows) % rows
      sum += grid[col][row].previous
    }
  }
  
  return sum
}