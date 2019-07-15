/*
Conceptually, the game of life is played out on an infinite grid.
For various reasons, we want to actually iterate over finite space.
Thus, for the purpose of this exercise, we will define a 15x15 grid.
*/

/*
First, we describe a grid.
*/

class Coords {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
}


class LifeGrid {
  constructor(x,y, unsafe=false) {
    this.renderBounds(x,y, unsafe)
    this.width = x+1
    this.height = y+1
    this.matrix = this.initializeMatrix()
    // We define ranges as "parameter +1" so that when we say "15" --
    // The grid actually goes 0-15 instead of 0-14 (but has 15 spaces)

    console.log(this.matrix)

  }

  renderBounds(x,y, unsafe) {
    const maxLength = ((2**31) + (2**31-2)) // JS array limit

    if (x < 2 || y < 2) {
      throw RangeError("Not big enough to play the game!")
    } else if (!unsafe && (x > 99 || y > 99)) {
      throw RangeError("Dangerous render! Are you sure?!")
    } else if (x > maxLength || y > maxLength) {
      throw RangeError("Impossible render!")
    }
  }

  initializeMatrix() {
    // Having confirmed that we want to render, we build the raw matrix.
    const row = new Array(this.width).fill(0) // Initialize bare rows
    const matrix = new Array(this.height).fill(row) // ...to fill the columns

    return matrix
  }

  theHood(x,y) {
    // Generalized function for inspecting the adjacent coordinates
    // 0,0 starts in the upper left corner
    // -1,-1 would define the upper left of a given coordinate
    // +1,+1 would define the lower right of a given coordinate
    // edgeHandler
    let neighbors = 0
    const start = this.edgeHandler({x: x-1, y: y-1})
    const end = this.edgeHandler({x: x+1, y: y+1})
    return neighbors
  }

  edgeHandler(coords) {
    if coords.x < 0 {
      return {}
    } else if edge > this.
  }

  rulesOfNature(matrix) {
    /*
      No choice
      Out here only the strong survive
      What's done is done
      Survived to see another day
      The game of life
      The hunter and the agile prey
      No guarantee
      Which of them will succeed
      Strong or Weak
      Rules of Nature!
    */
    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    // Any live cell with two or three live neighbours lives on to the next generation.
    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    // Any dead cell with three live neighbours becomes a live cell, as if by reproduction.
  }
}

const testMedium = new LifeGrid(15,15,true)

// const testSmall = new Grid(-1,-1) // Fails correctly.
// const testBiggish = new Grid(100,100) // Also fails correctly.
// const testBig = new LifeGrid(101,101,true) // Forces a render

const tooBigNum = (2**31) + (2**31)
const testHuge = new LifeGrid(tooBigNum,tooBigNum,true)