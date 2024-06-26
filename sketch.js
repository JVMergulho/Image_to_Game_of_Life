const WIDTH = 640
const HEIGHT = 640
const RES = 8

// 640/8 = 40 -> 80 
// espera uma imagem 80x80

let image

let start = false

let startBtn
let slider
let grid
let cols
let rows

function setup() {
  createCanvas(WIDTH, HEIGHT)
  frameRate(1)
  cols = floor(width / RES)
  rows = floor(height / RES)
  
  grid = makeGrid(cols, rows)
  
  slider = createSlider(1,60,1);
  slider.position(WIDTH - 200, HEIGHT + 50);
  slider.style('width', '200px');

  startBtn = createButton('Start');
  startBtn.position(WIDTH - 130, HEIGHT + 10);
  startBtn.mousePressed(play)
  startBtn.size(60, 30)
  startBtn.style("font-size", "16px");

  resetBtn = createButton('Reset');
  resetBtn.position(WIDTH - 60, HEIGHT + 10);
  resetBtn.mousePressed(reset)
  resetBtn.size(60, 30)
  resetBtn.style("font-size", "16px");
}

function draw() {
  background(0)
  frameRate(slider.value());
  
  for (let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      grid[i][j].show()
    }
  }

  if(start){
    for (let i = 0; i < cols; i++){
      for(let j = 0; j < rows; j++){
        let neighbors = countNeighbors(i, j)
        grid[i][j].updateState(neighbors)
      }
    }
  }
  
}

function preload() {
  image = loadImage("examples/input_img_no_bg.png");
}

function play(){
  start = !start
  
  if(!start){
    startBtn.html("Start")
  } else {
    startBtn.html("Stop")
  }
}

function makeGrid(cols, rows){
  const TRESH = 90

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

function mouseClicked() {
  if (mouseX >= 0 && mouseX < WIDTH && mouseY >= 0 && mouseY < HEIGHT) {
    let col = floor(mouseX / RES);
    let row = floor(mouseY / RES);
    
    if(grid[col][row].state===0){
      grid[col][row].state = 1;
      grid[col][row].previous =  grid[col][row].state;
    } else{
      grid[col][row].state = 0;
      grid[col][row].previous =  grid[col][row].state;
    }
    
  }
}

function reset(){
  grid = makeGrid(cols, rows)
  start = false
  startBtn.html("Start")
}