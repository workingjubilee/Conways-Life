/*
Conceptually, the game of life is played out on an infinite grid.
For various reasons, we want to actually iterate over finite space.
Thus, for the purpose of this exercise, we will define a 15x15 grid.
*/


class Grid {
  constructor(x,y) {
    this.rangeBounds(x,y)
    this.width = x+1
    this.height = y+1
    // We define ranges as "parameter +1" so that when we say "15" --
    // The grid actually goes 0-15 instead of 0-14 (but has 15 spaces)
  }

  rangeBounds(x,y) {
    const BabyBear = new RangeError("Not big enough to render!")
    const PapaBear = new RangeError("Too big! Are you sure?!")
    if (x < 0 || y < 0) {
      throw BabyBear
    } else if (x > 100 || y > 100) {
      throw PapaBear
    }
  }
}

const testBig = new Grid(101,101) // Fails correctly.
const testSmall = new Grid(-1,-1) // Also fails correctly.