"use strict"
/*
  I constantly am working with complex matrix problems.
*/
function IndelibleInk(source=[]) {
  if (!(this instanceof IndelibleInk)) {
    return new IndelibleInk(source)
  } else {
    const handler = {
      set(object, key, value) {
        if (object[key] !== undefined) {
          return false
        } else {
          return Reflect.defineProperty(object, key, {
            value: value,
            writable: false,
            configurable: false
          })
        }
      }
    }

    const proxy = new Proxy(this, handler)
    for (let [k,v] of source.entries()) {
      proxy[k] = v
    }

    return proxy
  }
}

const pureData = IndelibleInk(['pow'])
console.log(pureData.target,"target")
console.log(pureData[0],"access")


function MatrixMetaSchema(params) {
  if (!(this instanceof MatrixMetaSchema)) {
    return new MatrixMetaSchema(params)
  } else {
    /* */
  }
  const metaschema = IndelibleInk()

  metaschema['dimensions'] = ['x', 'y']
  metaschema['required'] = ['dimensions', 'defaultValue']
  metaschema['optional'] = []
  metaschema['schema'] = ['required', 'optional']

  return metaschema
}

const constructedSchema = new MatrixMetaSchema()
const naturalSchema = MatrixMetaSchema()
console.log(constructedSchema['dimensions'], "with constructor")
console.log(naturalSchema['dimensions'], "natural")
console.log(naturalSchema instanceof Object) // true

function recursivelyFlatten(object,key='schema',cacheArray=[]) {
  for (let [i] in object[key]) {
    let location = object[key][i]
    if (object[location] !== undefined) {
      recursivelyFlatten(object, location, cacheArray)
    } else {
      cacheArray.push(object[key][i])
    }
  }
  return cacheArray
}

class MatrixSchema {
  constructor(...params) {
    this.metaschema = new MatrixMetaSchema()
    this.iteration = recursivelyFlatten(this.metaschema)
    this.iterator = 0
    this.schema = new IndelibleInk()
  }
  assignNext(value) {
    if (this.iterator < this.iteration.length) {
      let key = this.iteration[this.iterator]
      this.schema[key] = value
    } else {
      return false
    }
  }
}

const newSchema = new MatrixSchema()
// console.log(newSchema.iterAssign('test'))
newSchema.assignNext('test')

function reduceParam(accumulator, current) {
  if (typeof current === 'object') {
    if ([...Object.keys(current)].every(key => typeof key === 'number')) {
      "lol"
    } else {
      for (let entry in current) {
        accumulator[entry] = current[entry]
      }
    }
  } else {
    iterAssign(accumulator,current)
  }

  return accumulator
}

function extractParams(params) {
  const data = new IndelibleInk()
  const values = params.reduceRight((acc,param) => reduceParam(acc,param), data)

  return values
}

function initMatrix(x,y, filler=undefined) {
  // First, we verify we can build the matrix
  const maxLength = ((2**31) + (2**31-1)) // JS array limit

  if (x < 1 || y < 1) {
    throw RangeError("Not big enough to produce a matrix!")
  } else if (x > maxLength || y > maxLength) {
    throw RangeError("Impossible matrix in JavaScript!")
  } else {

    // We build the matrix, now that we know we want it
    const row = new Array(x).fill(filler) // Initialize columns
    const matrix = new Array(y).fill([...row]) // ...to fill the rows

    return matrix
  }
}

class Matrix {
  constructor(x,y,) {
    let newParams = extractParams(params)
    let { x, y, filler, contents } = extractParams(params)
    console.log(newParams[0])
    this.dimensions = { x: x, y: y }
    this.size = this.dimensions.values().reduce((acc, cum) => acc*cum, 1)
    this.matrix = new Map()
  }
  getCell(...locations){

  }
}

const stuff = new Matrix({'x': 5})

// function MatrixFactoryFactors() {

// }

// // const testMedium = new Matrix(-1,-1)
// const testSmol = new Matrix({ x: 15, y: 15, filler: 0}, [1])

// // class SparseMatrix {
// //   constructor(x,y,filler,contents) {
// //     this.width = x
// //     this.height = y
// //     this.matrix = 
// //   }
// // }

// // class FullMatrix {
// //   constructor(...params) {
// //     this.matrix = 
// //   }
// // }

