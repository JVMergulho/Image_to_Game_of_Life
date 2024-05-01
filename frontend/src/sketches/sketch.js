// John Conway's Game of Life

export default function sketch(p5) {

  // class that describes the behaviour of a single cell in the grid
  class Cell {
    constructor(state, x, y, w) {
      this.state = state;
      this.previous = this.state;
  
      this.x = x;
      this.y = y;
      this.w = w;
    }
    
    // defines the new state based on the Game of Life ruleset
    updateState(neighbors){
      if(this.previous === 0 && neighbors == 3){
          this.state = 1
      }else if(this.previous == 1 && (neighbors < 2 || neighbors > 3)){
        this.state = 0
      } 
    }
  
    // paints the cell with a color
    show() {
      p5.stroke(0);
      // If the cell is born, color it blue!
      if (this.previous === 0 && this.state == 1) {
        p5.fill("#8ba3c7");
      } else if (this.state == 1) {
        p5.fill(0);
        // If the cell dies, color it red!
      } else if (this.previous == 1 && this.state === 0) {
        p5.fill("#F25E3D");
      } else {
        p5.fill("#F2E1CC");
      }
      p5.square(this.x, this.y, this.w);
  
      // update the previous state
      this.previous = this.state
    }
  }

  const WIDTH = 600
  const HEIGHT = 600
  // RES tem que ser divisor de WIDTH e HEIGHT
  const RES = 20

  let grid
  let cols
  let rows

  function makeGrid(){
    let arr = new Array(cols)
    for (let i = 0; i < cols; i++){
      arr[i] = new Array(rows)
      
      for(let j = 0; j < rows; j++){
        arr[i][j] = new Cell(Math.round(Math.random()), i*RES, j*RES, RES)
      }
    }
    
    return arr
  }

  function countNeighbors(x, y){
    let sum = 0
    
    for (let i = -1; i < 2; i++){
      for(let j = -1; j < 2; j++){
        if(i==0 && j==0){
          continue
        }
        let col = (x + i + cols) % cols
        let row = (y + j + rows) % rows
        sum += grid[col][row].previous
      }
    }

    return sum
  }

  p5.setup = () =>{
    p5.frameRate(30)
    p5.createCanvas(WIDTH, HEIGHT, p5.WEBGL);
    cols = p5.floor(WIDTH / RES)
    rows =  p5.floor(HEIGHT / RES)

    grid = makeGrid(cols, rows)
  } 

  p5.draw = () => {
    p5.background(255);
  
    // render cells
    for (let i = 0; i < cols; i++){
      for(let j = 0; j < rows; j++){
        grid[i][j].show()
        let neighbors = countNeighbors(i, j)
        grid[i][j].updateState(neighbors)
      }
    }

  };
}