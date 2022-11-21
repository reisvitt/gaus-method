/*
funcao gausMethod (matriz, length)

inicio

  para ( index de 1 ate length) faca
    se hasToPivotate(matriz) faca 
      pivotate(matriz)
    fimse

    pivot = matriz[index][index] // pivo para quele indice

    para (indexColumn de index + 1  ate matriz.length) faca
      m = matriz[index][indexColumn] / pivot
      // m -> fator para zerar o item da linha abaixo do pivot

      // a cada loop o vector recebe uma coluna da matriz
      para (indexVector de 1 ate matrizTest.length) faca 
        vector = matriz[indexVector] // pega a coluna
        vector[indexColumn] = (m * vector[index]) - vector[indexColumn]

        // vector[indexColumn] -> item abaixo do pivot
        // vector[index] -> item da linha do pivot -> referencia para a multiplicacao do factor
        // vector[indexColumn] -> item da linha abaixo do pivo
      fimpara
    fimpara
  fimpara

  retorna matriz
fim




funcao linearSystemSoluction(matriz, vector)
// recebe a matriz e o vetor de termos independentes

inicio
  solution = numero[]

  para (index de matriz.length - 1 ate 1) faca
    soma = 0

    // percorre as colunas de index + 1 ate o fim da matriz multiplicando as variaveis pelo seu valor ja calculado
    para (indexColumn de index + 1 ate matriz.length) faca
      soma = soma + (solution[indexColumn]) * matriz[indexColumn][index]

      // solution[indexColumn] -> valor da solucao da variavel que esta  na posicao indexColumn
      // matriz[indexColumn][index] -> item da matriz que deve ser multiplicado pela valor da variavel resolvida anteriormente
    fimpara

    solution[index] = (vector[index] - soma) / matriz[index][index]

    // solution[index] -> solucao para a variavel naquele index
    // vector[index] - soma -> vetor de termos independentes na posicao index menos a soma 
    // matriz[index][index] -> valor da variavel que esta sendo calculada no momento na matriz
  fimpara

  retorna solution
fim

*/