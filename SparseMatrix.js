class SparseMatrix {
  constructor(x,y,defaultValue=0) {
    this.dimensions = { 'x': x, 'y': y }
    this.size = Object.values(this.dimensions).reduce((acc, cum) => acc*cum, 1)
    this.defaultValue = defaultValue
    this.matrixMap = new Map()
  }

  getElement(...locations) {
    let last = this.matrixMap
    for (let [i] in locations) {
      last = last.get(locations[i])
      if (last === undefined) {
        return this.defaultValue
      }
    }
    return last
  }

  setElement(...args) {
    const locations = args.slice(0,-2)
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

  renderMatrix() {
    const matrix = new Array(this.dimensions.y)
    for (let i = 0, limit = matrix.length; i < limit; i++) {
      let row = new Array(this.dimensions.x).fill(this.defaultValue)
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

const matrix = new SparseMatrix(5,5)
console.log(matrix.setElement(3,4,2))
console.log(matrix.setElement(2,1,1))

// console.log(matrix.getElement(3,4),"test")
// console.log(matrix.getElement(2,5))

// console.log(matrix.matrixMap.keys())
console.log(matrix.renderMatrix())