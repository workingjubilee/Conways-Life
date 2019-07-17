/*
Conceptually, the game of life is played out on an infinite grid.
For various reasons, we want to actually iterate over finite space.
Thus, for the purpose of this exercise, we will define a 15x15 grid.
*/

/*
First, we describe a matrix.
*/


class Matrix {
  constructor(x,y,defaultValue=0) {
    this.dimensions = [{ axis: 'x', value: x }, {axis: 'y', value: y }]
    this.size = this.dimensions.values().reduce((acc, cum) => acc*cum, 1)
    this.defaultValue = 0
    this.matrix = new Map()
  }
  getElement(...locations) {
    last = this.matrix
    for (let [i] in locations) {
      last = last.get(o)
      if (last === undefined) {
        return this.defaultValue
      }
    }
    return last
  }
  setElement(...args) {
    const locations = args.slice(0,-2)
    const [key, value] = args.slice(-2)
    last = this.matrix
    for (let [i] in locations) {
      if (last === undefined) {
        last = new Map()
      }
      last = last.get(i)
    }
    last.set()
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
    const row = new Array(this.width).fill(0) // Initialize bare columns
    const matrix = new Array(this.height).fill(row) // ...to fill the rows

    return matrix
  }

  adjacent(...coords) {
    if (coords[0]) instanceof Object {
    } else if (length(coords) %2) {

    }
    // Generalized function for inspecting the adjacent coordinates
    // -1,-1 would define the upper left of a given coordinate
    // +1,+1 would define the lower right of a given coordinate
    let neighbors = 0

    const start = this.edgeHandler({x: x-1, y: y-1})
    const end = this.edgeHandler({x: x+1, y: y+1})
    return neighbors
  }

  refer(...coords) {

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

    // Any live cell with fewer than two live neighbours dies
    // Any live cell with two or three live neighbours lives on
    // Any live cell with more than three live neighbours dies
    // Any dead cell with three live neighbours becomes a live cell
  }
}

const testMedium = new LifeGrid(15,15,true)

// const testSmall = new Grid(-1,-1) // Fails correctly.
// const testBiggish = new Grid(100,100) // Also fails correctly.
// const testBig = new LifeGrid(101,101,true) // Forces a render

const tooBigNum = (2**31) + (2**31)
const testHuge = new LifeGrid(tooBigNum,tooBigNum,true)