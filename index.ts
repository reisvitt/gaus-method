type Vector = number[] // vector type
type Matriz = Vector[] // matriz type
const factor = 0.05 // factor that checks if it is close to zero

const matrizTest = 
  [
    [1, 1, 0, 0, 0],
    [1, 0, 1, 1, 0],
    [0, 1, 1, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1],
  ]


const vetorTest = [87, 123, 66, 90, 133]


/**
 * Returns a vector containing the solution
 * @param {Matriz} matriz 
 * @param {Vector} independents 
 * @returns {Vector} Solution
 */
const start = (matriz: Matriz, independents: Vector): Vector => {
  logMatriz(matriz)
  const extended = getExtendedMatriz(matriz, independents)
  logMatriz(extended)
  const gaus =  gausMethod(extended, matriz.length)
  logMatriz(gaus)
  const gausMatriz = getMatriz(gaus, matriz.length)
  const gausIndependents = getVector(gaus, matriz.length)
  const solution = linearSystemSoluction(gausMatriz, gausIndependents)
  logVector(solution)
  return solution
}


/**
 * Return a Matriz extended of one Matriz and one vector
 * @param {Matriz} matriz 
 * @param {Vector} vector 
 * @returns {Matriz} Matriz
 */
const getExtendedMatriz = (matriz: Matriz, vector: Vector): Matriz => {
  const tempMatriz = [...matriz, vector]

  return tempMatriz
}


/**
 * Return a Matriz of Matriz extended
 * @param {Matriz} matriz
 * @param {number} length
 * @returns {Matriz} Matriz
 */
 const getMatriz = (matriz: Matriz, length: number): Matriz => {
  if(matriz.length < length){
    throw new Error('Matriz não pode ser menor que o seu tamanho')
  }

  if(matriz.length === length){
    return matriz
  }

  const tempMatriz = getNewMatriz(matriz)
  tempMatriz.pop()
 
  return getMatriz(tempMatriz, length)
}


/**
 * Return a Vector of Matriz extended
 * @param {Matriz} matriz
 * @param {number} length
 * @returns {Matriz} Matriz
 */
 const getVector = (matriz: Matriz, length: number): Vector => {
  if(matriz.length < length){
    throw new Error('Matriz não pode ser menor que o seu tamanho')
  }

  if(matriz.length < 1){
    throw new Error('Matriz não pode ser menor que 1')
  }

  const vector = getNewMatriz(matriz).pop() || []

 
  return vector
}

/**
 * Check if it's required to pivotate the matriz
 * @example 
 *  2  2  3    2  2  3
 *  1  0  5 -> 2  2  5
 *  2  2  5    1  0  5
 * @param matriz
 * @returns {boolean} boolean
 */
const hasToPivotate = (matriz: Matriz): boolean => {
  const factor = 0.3 // factor that checks if it is close to zero

  for (let index = 0; index < matriz.length; index++) {
    const column = matriz[index]; // column

    const item = column[index]; // pivot

    if(Math.abs(Number(item)) - factor <= 0){ // it's close to zero or it's zero
      // check if there is item bigger than thea actual item below

      for (let indexItem = index; indexItem < column.length; indexItem++) {
        if(Math.abs(Number(item)) < Math.abs(Number(column[indexItem]))){ // there is item bigger than actual item
          return true
        }
      }
    }
  }// for matriz

  return false
}

/**
 * Return a pivotate matriz
 * @example 
 *  2  2  3    2  2  3
 *  1  0  5 -> 2  2  5
 *  2  2  5    1  0  5
 * @param matriz 
 * @returns {Matriz} Matriz
 */
 const pivotate = (matriz: Matriz): Matriz => {
  for (let index = 0; index <  matriz.length; index++) {
    const column = matriz[index]; // column

    const item = column[index]; // pivot

    if(Math.abs(Number(item)) - factor <= 0){ // it's close to zero or it's zero
      // check if there is item bigger than thea actual item below

      for (let indexItem = index; indexItem < column.length; indexItem++) {
        if(Math.abs(Number(item)) < Math.abs(Number(column[indexItem]))){ // there is item bigger than actual item
          switchLine(matriz, index, indexItem)
          //const tempMatriz = switchLine(matriz, index, indexItem)
          //return pivotate(tempMatriz, length)
        }
      }
    }
  }// for matriz

  return matriz
}

/**
 * Switch lines of a matriz
 * @example indexLine1 = 1, indexLine2 = 2
 *  2  2  3    2  2  3
 *  1  0  5 -> 2  2  5
 *  2  2  5    1  0  5
 * @param {Matriz} matriz 
 * @param {number} indexLine1 
 * @param {number} indexLine2 
 * @returns {Matriz} Matriz
 */
const switchLine = (matriz: Matriz, indexLine1: number, indexLine2: number): Matriz => {

  const tempMatriz: Matriz = matriz.map((vector) => {
    const temp =  vector[indexLine1]
    vector[indexLine1] = vector[indexLine2]
    vector[indexLine2] = temp
    return vector
  })

  return tempMatriz
}

/**
 * Apply the gauss method on the matriz
 * @param {Matriz} matriz 
 * @param {number} length 
 * @returns {Matriz} matriz
 */
const gausMethod = (matriz: Matriz, length: number): Matriz => {

  for (let index = 0; index < length; index++) {
    if(hasToPivotate(matriz)){
      pivotate(matriz)
    }

    const pivot = matriz[index][index]; // pivot

    for (let indexColumn = index + 1; indexColumn < length; indexColumn++) {
      const m = matriz[index][indexColumn] / pivot
      

      for (let indexVector = 0; indexVector < matriz.length; indexVector++) {
        const vector = matriz[indexVector];
        vector[indexColumn] = (m * vector[index]) - vector[indexColumn]
      }
    }
  }// for matriz

  return matriz
}

/**
 * Return a soluction for the matriz
 * @param {Matriz} matriz 
 * @param {Vector} vector 
 * @returns {Vector} Vector
 */
 const linearSystemSoluction = (matriz: Matriz, vector: Vector): Vector => {
  let solution: number[] = []

  for (let index = matriz.length - 1; index >= 0; index--) {
    let soma = 0
    for (let indexColumn = index + 1; indexColumn < matriz.length; indexColumn++) {
     soma = soma + (solution[indexColumn] || 0) * matriz[indexColumn][index]
    }

    solution[index] =  (vector[index] - soma) / matriz[index][index]
    
  }

  return solution
}

const convertToLineColumn = (matriz: Matriz): Matriz => {
  const tempMatriz = getNewMatriz(matriz)
  let independents: Vector = []

  const isExtended = tempMatriz.length === (tempMatriz[0].length + 1)
  if(isExtended){
    independents = tempMatriz.pop() || []
  }
  
  matriz.forEach((vector, index) => {
    if(index >= vector.length){
      return
    }
    vector.forEach((item, indexVector) => {
      tempMatriz[indexVector][index] = item
    })

    if(isExtended){
      tempMatriz[index].push(independents[index])
    }
  });

  return tempMatriz
}

const getNewMatriz = (matriz: Matriz): Matriz => {
  const tempMatriz = matriz.map(vector => [...vector])
  return tempMatriz
}

const logMatriz = (matriz: Matriz): void => {
  console.log()
  const temp = convertToLineColumn(matriz)
  temp.forEach(vector => {
    logVector(vector)
  });

  console.log("--------------------------------------")
  console.log()
}

const logVector = (vector: Vector): void => {
  console.log(vector.join("   "))
}

start(matrizTest, vetorTest)