class SparseMatrix {
  constructor(x,y,defaultValue=0) {
    this.vectors = ['x', 'z']
    this.ranges = [x,y]
    this.size = Object.values(this.vectors).reduce((acc, cum) => acc*cum, 1)
    this.defaultValue = defaultValue
    this.matrixMap = new Map()
  }

  matchArrays(first,second) {
    if (first.length !== second.length) {
      return false
    } else { }

    for (let [i] in first) {
      if (first[i] !== second[i]) {
        return false
      } else { }
    }

    return true
  }

  addMatrix(matrix) {
    if (!(this.matchArrays(this.vectors, matrix.vectors))) {
      return false
    } else if (!(this.matchArrays(this.ranges, matrix.ranges))) {
      return false
    } else { }

    for (let [c] of matrix.matrixMap.entries()) {
      for (let [r] of matrix.matrixMap.get(c)) {
        let value = matrix.getElement(c,r) + this.getElement(c,r)
        this.setElement(c,r, value)
      }
    }
    return this.renderMatrix()
  }

  find(...locations) {
    /* This matches all queries to actual locations in the matrix. */
    /* It implements a "toroid" logic rather than "falling off the edge". */
    for (let [i] in locations) {
      if (locations[i] < 0) {
        locations[i] = (this.ranges[i] + (locations[i]%this.ranges[i])) % this.ranges[i]
      } else if (locations[i] >= this.ranges[i]) {
        locations[i] = locations[i] % this.ranges[i]
      } else { }
    }

    return locations
  }

  findSubmatrix(start, end, ...rest) {
    /* Returns locations on the matrix between start and end, inclusive. */
    if (!([start, end].every(point => point.length === this.vectors.length))) {
      throw Error("Invalid submatrix get!")
    } else { }

    start = this.find(...start)
    end = this.find(...end)

    const submatrixLocations = []
    const ranges = {}
    for (let [i] in this.vectors) {
      ranges[this.vectors[i]] = []
    }
    

    for (let [i] in start) {
      if (start[i] > end[i]) {
        for (let j = start[i]; j < this.ranges[i]; j++) {
          ranges[this.vectors[i]].push(j)
        }
        for (let j = 0; j <= end[i]; j++) {
          ranges[this.vectors[i]].push(j)
        }
      } else {
        for (let j = start[i]; j <= end[i]; j++) {
          ranges[this.vectors[i]].push(j)
        }
      }
    }

    let buffer = []
    for (let i = 0, iLimit = ranges[this.vectors[0]].length; i < iLimit; i++) {
      for (let j = 0, jLimit = ranges[this.vectors[0]].length; j < jLimit; j++) {
        buffer.push(Array.of(ranges[this.vectors[0]][i], ranges[this.vectors[1]][j]))      
      }
    }
    submatrixLocations.push.apply(submatrixLocations, [...buffer.slice()])

    return submatrixLocations
  }

  getElement(...locations) {
    locations = this.find(...locations)
    let last = this.matrixMap

    for (let [i] in locations) {
      last = last.get(locations[i])
      if (last === undefined) {
        return this.defaultValue
      }
    }

    return last
  }

  deleteElement(...args) {
    let locations = this.find(...args.slice(0,-1))
    let [target] = args.slice(-1)
    let last = this.matrixMap

    for (let [i] in locations) {
      last = last.get(locations[i])
      if (last === undefined) {
        return this.defaultValue
      } else { }
    }

    last.delete(target)
  }

  setElement(...args) {
    const locations = this.find(...args.slice(0,-2))
    const [key, value] = args.slice(-2)
    let last = this.matrixMap
    let next = undefined

    for (let [i] in locations) {
      next = last.get(locations[i])
      if (next === undefined) {
        last.set(locations[i], new Map())
      }
      last = last.get(locations[i])
    }

    return last.set(key,value)
  }

  addElement(...args) {
    const locations = this.find(...args.slice(0,-2))
    const [key, value] = args.slice(-2)
    const current = this.getElement(...locations, key)

    return this.setElement(...locations, key, current+value)
  }

  renderMatrix() {
    const matrix = new Array(this.ranges[1])

    for (let i = 0, limit = matrix.length; i < limit; i++) {
      let row = new Array(this.ranges[0]).fill(this.defaultValue)
      matrix[i] = row
    }

    for (let [c] of this.matrixMap.entries()) {
      for (let [r] of this.matrixMap.get(c)) {
        matrix[r][c] = this.getElement(c,r)
      }
    }

    return matrix
  }
}

class GameOfLife extends SparseMatrix {
  constructor(x=15,y=15,defaultValue=0) {
    super(x,y,defaultValue)
  }

  getAdjacents(x,y) {
    const adjacents = this.findSubmatrix([x-1,y-1], [x+1, y+1]).filter(element => (!(this.matchArrays(element, [x,y]))) )

    return adjacents
  }

  /*generateLifeIteration(generation) {
    let i, iLimit
    let j, jLimit
    for (i = 0, iLimit = this.ranges[1]; i < iLimit; i++) {
      for (j = 0, jLimit = this.ranges[0]; j < jLimit; j++) {


      }
    }
  }*/

  generateLifeWithHeatMap(generation) {
    this.buildHeatMap(generation)

    for (let [c] of generation.matrixMap.entries()) {
      for (let [r] of generation.matrixMap.get(c)) {
        let heat = this.getElement(c,r)
        if (heat === -2 || heat === -3) {
          this.setElement(c,r,1)
        } else {
          this.deleteElement(c,r)
        }
      }
    }

    for (let [c] of this.matrixMap.entries()) {
      for (let [r,v] of this.matrixMap.get(c).entries()) {
        if (this.getElement(c,r) === -3) {
          this.setElement(c,r,1)
        } else if (this.getElement(c,r) < 0) {
          this.deleteElement(c,r)
        }
      }
    }

    return this.renderMatrix()
  }

  buildHeatMap(generation) {
    this.matrixMap = new Map()

    for (let [c] of generation.matrixMap.entries()) {
      for (let [r] of generation.matrixMap.get(c)) {
        for (let [x,y] of generation.getAdjacents(c,r)) {
          this.addElement(x,y,-1)
        }
      }
    }
  }
}

const matrix = new SparseMatrix(5,5)
matrix.setElement(3,4,2)
matrix.setElement(2,1,1)

const secondMatrix = new SparseMatrix(5,5)
secondMatrix.setElement(1,2,2)
secondMatrix.setElement(4,0,5)

// console.log(matrix.renderMatrix())
// console.log(secondMatrix.renderMatrix())

console.log(matrix.addMatrix(secondMatrix))
// matrix.renderMatrix())


// console.log(matrix.getElement(3,9),"wrapbigtest")
console.log(matrix.addElement(-1,0,2), "wrapnegtest")
console.log(matrix.renderMatrix())
console.log(matrix.findSubmatrix([2,3], [3,4]))

console.log(matrix.findSubmatrix([2,3], [3,4]))
// console.log(matrix.getElement(2,5))

// console.log(matrix.matrixMap.keys())

gen0 = new GameOfLife()
gen0.addElement(2,3,1)
gen0.addElement(2,4,1)
gen0.addElement(2,5,1)
console.log(gen0.renderMatrix())
gen1 = new GameOfLife()
gen1.generateLifeWithHeatMap(gen0)
console.log(gen1.renderMatrix())