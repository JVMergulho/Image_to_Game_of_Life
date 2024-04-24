// Game of Life ruleset
// if a dead cell is next to other 3 live cells it lives, as if for reproduction
// if a live cell has less than 2 neighbors it dies, as if for loniliness
// if a live cell has more than 3 neighbors it dies, as if for overpopulation
// otherwise, the cell keeps its previous state

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
    stroke(0);
    // If the cell is born, color it blue!
    if (this.previous === 0 && this.state == 1) {
      fill(100, 100, 255);
    } else if (this.state == 1) {
      fill(0);
      // If the cell dies, color it red!
    } else if (this.previous == 1 && this.state === 0) {
      fill(255, 150, 150);
    } else {
      fill(255);
    }
    square(this.x, this.y, this.w);

    // update the previous state
    this.previous = this.state
  }
}