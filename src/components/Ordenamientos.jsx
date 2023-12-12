  import { Button, Box, Divider } from '@mui/material';
  import React, { useState } from 'react';

//Se declara una función de flecha que recibe libros como argumento. 
const Ordenamientos = ({ libros }) => {
  //Se declara también un useState (estado) con una matriz [que llevará dentro una copia de la martiz libros que recibe como argumento]
  //sortedLibros para almacenar estado
  const [sortedLibros, setSortedLibros] = useState([...libros]);

  //Parte de Manuel 
  const resetLibros = () => {
    //Esta función tiene como fin regresar a su ordenamiento (desordenado) o como originalmente nos pasaron en los argumentos { libros } de nuestra función.
    setSortedLibros([...libros]);
  };
  
  const bubbleSort = () => {
    //Se hace una función de flecha que manejará el ordenamiento del bubbleSort
    const n = sortedLibros.length;       //Se declara la constante n la cual tiene como valor el largo de nuestra lista para así poder manejar la cantidad de pasos a hacer.
    let tempLibros = [...sortedLibros];  //Se declara una variable tempLibros la cual es una copia temporal de la lista sortedLibros para manejar los cambios en la misma en cada paso.
    let swapped;                         //Una variable de tipo boolean que cambiará de lugar los elementos de la lista en cada paso 

    let i = 0;                           //Se declaran dos variables que "i" y "j" las cuales manejarán los índices de los elementos de nuestra lista temporal de libros tempLibros

    const sortStep = () => {
      //Se declara un método/función que representa lo que hará en cada pasó el Bubble Sort.
      if (i < n - 1) {  
      //Si la variable "i" es menor a la variable "n" - 1 (el -1 por la convención progrmatica de 0, 1, 2, 3, etc) entonces...  
        if (tempLibros[i].id > tempLibros[i + 1].id) {
        //...Si la condición anterior se cumple, entonces iniciamos otra condicón
        //donde si el "id" del elemento en el indice "i" de la lista temporal es más grande que el "id" del elemento siguiente (de ahí el + 1) de la misma lista, entonces...
        //Si se cumple esta condición se intercambia el orden de nuestra lista temporal de la siguiente manera...
          [tempLibros[i], tempLibros[i + 1]] = [tempLibros[i + 1], tempLibros[i]];
          //swapped cambia su valor a true, para que lo anterior pueda ser cambiado
          swapped = true;

          //Se actualiza el estado original de sorteLibros con nuestra lista temporal que ya tiene un cambio en la misma
          setSortedLibros([...tempLibros]);
        }
        //se suma +1 en la variable "i"para avanzar al siguiente elemento de la lista
        i++;
      } else {
      //Ahora, si nuestra primer condición no se cumplía, la variable "i" regresa al valor 0, para volver a recorrer la lista.
        i = 0;
        if (!swapped) {
        // Si no hubo intercambios, el arreglo está ordenado
          return;
        }
        swapped = false;
        }

        // Siguiente iteración, y con un retardo para que se note el cambio en la misma lista
        setTimeout(sortStep, 1000); // Ajusta el retardo según sea necesario
    };

    // Comienza el proceso de ordenamiento una vez más hasta que la lista este ordenda. 
    sortStep();
  };

  //Parte de Adán
  const insertionSort = () => {
  //Iniciamos un nuevo método de flecha para el Insertion Sort.  
    let tempLibros = [...sortedLibros]; //Se declara una variable tempLibros la cual es una copia temporal de la lista sortedLibros para manejar los cambios en la misma en cada paso.

    const performInsertionSort = async () => {
    //Se declara dentro una función nueva con el detalle de que esta es asincrona   
    //Esto significa que esperará una promesa.
      for (let i = 1; i < tempLibros.length; i++) {
      //Se inicia un for simple para recorrer el largo de la lista, donde por cada elemento:
      //Se declara una variable "j" con un valor de "i - 1"
      //se declara una constante currentLibro (o libro actual) que representa un elemento con el indice "i" que guardaremos durante la iteración y usaremos para compara el resto de los elementos en la lista 
        let j = i - 1;
        const currentLibro = tempLibros[i];

        while (j >= 0 && tempLibros[j].id > currentLibro.id) {
        //Mientras la variable "j" sea mayor o igual a 0 y el "id" del elemento con el indice "j" sea mayor a el "id" del elemento que guardamos temporalmente en el paso anterior, entonces hará lo siguiente:
          //Ahora el elemento con el indice "j + 1" tendrá el valor de su elemento anterior que por defecto es el elemento con indice "j".
          tempLibros[j + 1] = tempLibros[j];
          //y después el elemento con indicie "j" toma el valor del elemento temporal que guardamos anteriormente
          tempLibros[j] = currentLibro;

          //Se actualiza el estado, o sea, el orden de la lista
          setSortedLibros([...tempLibros]);

          //Aquí esta la promesa que se espera del mismo elemento asincrono el cual esperará 1000 milisegundos para ejecutarse nuevamente.
          await new Promise(resolve => setTimeout(resolve, 1000));
          //Y finalmente resta "-1" a la variable "j"
          j--;
        }
      }
    };

    //E inicia nuevamente el proceso de inserción a la lista, hasta que esta, este completa
    performInsertionSort();
  };
  
  const mergeSort = async () => {
    const merge = (left, right) => {
      let result = [];
      let leftIndex = 0;
      let rightIndex = 0;
    
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].id < right[rightIndex].id) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
      }
    
      return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    };
    
      const performMergeSort = async (arr) => {
        const len = arr.length;
        if (len <= 1) {
          return arr;
        }
    
        const middle = Math.floor(len / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);
    
        const leftSorted = await performMergeSort(left);
        const rightSorted = await performMergeSort(right);
    
        await new Promise(resolve => setTimeout(resolve, 1000));
    
        return merge(leftSorted, rightSorted);
      };
    
      const sortedArray = await performMergeSort(sortedLibros);
    
      // Update state to trigger re-render after sorting is complete
      setSortedLibros([...sortedArray]);
    };

    const heapSort = async () => {
      const heapify = async (arr, n, i) => {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && arr[left].id > arr[largest].id) {
          largest = left;
        }

        if (right < n && arr[right].id > arr[largest].id) {
          largest = right;
        }

        if (largest !== i) {
          // Swap libros
          [arr[i], arr[largest]] = [arr[largest], arr[i]];

          // Update state to trigger re-render after each swap
          setSortedLibros([...arr]);

          // Wait for 1000 miliseconds
          await new Promise(resolve => setTimeout(resolve, 1000));

          await heapify(arr, n, largest);
        }
      };

      const performHeapSort = async () => {
        const n = sortedLibros.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
          await heapify(sortedLibros, n, i);
        }

        for (let i = n - 1; i > 0; i--) {
          // Swap libros
          [sortedLibros[0], sortedLibros[i]] = [sortedLibros[i], sortedLibros[0]];

          // Update state to trigger re-render after each swap
          setSortedLibros([...sortedLibros]);

          // Wait for 1000 miliseconds
          await new Promise(resolve => setTimeout(resolve, 1000));

          await heapify(sortedLibros, i, 0);
        }
      };

      // Start the heap sort process
      await performHeapSort();
    };
    //Parte de Rubén
    const quickSort = async () => {
      const partition = async (arr, low, high) => {
        const pivot = arr[high].id;
        let i = low - 1;

        for (let j = low; j < high; j++) {
          if (arr[j].id < pivot) {
            i++;
            // Swap libros
            [arr[i], arr[j]] = [arr[j], arr[i]];

            // Update state to trigger re-render after each swap
            setSortedLibros([...arr]);

            // Wait for 1000 miliseconds
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }

        // Swap libros
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

        // Update state to trigger re-render after each swap
        setSortedLibros([...arr]);

        // Wait for 1000 miliseconds
        await new Promise(resolve => setTimeout(resolve, 1000));

        return i + 1;
      };

      const performQuickSort = async (arr, low, high) => {
        if (low < high) {
          const pi = await partition(arr, low, high);

          await Promise.all([
            performQuickSort(arr, low, pi - 1),
            performQuickSort(arr, pi + 1, high)
          ]);
        }
      };

      // Start the quick sort process
      await performQuickSort(sortedLibros, 0, sortedLibros.length - 1);
    };

    const countingSort = async () => {
      const maxId = Math.max(...sortedLibros.map(libro => libro.id));
      const countArray = new Array(maxId + 1).fill(0);
    
      sortedLibros.forEach(libro => {
        countArray[libro.id]++;
      });
    
      let sortedArray = [];
    
      for (let i = 0; i < countArray.length; i++) {
        // Agrega count veces el libro con el id al arreglo ordenado
        for (let j = 0; j < countArray[i]; j++) {
          sortedArray.push({ ...sortedLibros.find(libro => libro.id === i) });
    
          // Actualiza el arreglo ordenado y espera 1000 milisegundos
          setSortedLibros(sortedArray.slice());
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    };

    const bucketSort = async () => {
      const maxId = Math.max(...sortedLibros.map(libro => libro.id));
      const numBuckets = 5;
    
      const buckets = Array.from({ length: numBuckets }, () => []);
    
      sortedLibros.forEach(libro => {
        const bucketIndex = Math.floor((libro.id / maxId) * (numBuckets - 1)); // Adjusted the bucket index calculation
        buckets[bucketIndex].push(libro);
      });
    
      let sortedArray = [];
      for (let i = 0; i < numBuckets; i++) {
        buckets[i] = buckets[i].sort((a, b) => a.id - b.id);
        sortedArray = sortedArray.concat(buckets[i]);
        setSortedLibros([...sortedArray]);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    };   

  /*  const radixSort = async () => {
      const getMax = () => {
        return Math.max(...sortedLibros.map(libro => libro.id));
      };
    
      const countingSort = async (exp) => {
        const n = sortedLibros.length;
        const output = Array(n);
        const count = Array(10).fill(0);
    
        sortedLibros.forEach(libro => {
          const digit = Math.floor((libro.id / exp) % 10);
          count[digit]++;
        });
    
        for (let i = 1; i < 10; i++) {
          count[i] += count[i - 1];
        }
    
        for (let i = n - 1; i >= 0; i--) {
          const digit = Math.floor((sortedLibros[i].id / exp) % 10);
          output[count[digit] - 1] = { ...sortedLibros[i] };
          count[digit]--;
        }
    
        setSortedLibros(output);
        await new Promise(resolve => setTimeout(resolve, 1000));
      };
    
      const max = getMax();
    
      for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        await countingSort(exp);
      }
    };
    */
    
    return (
      <div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
        <div>
          <Button variant="contained" color="success" onClick={resetLibros}>
            Restaurar Lista Original
          </Button>  
          <br />    
          <br />    
          <Button variant="contained" onClick={bubbleSort}>
            Ordenar con Bubble Sort
          </Button>
          <br />
          <br />    
          <Button variant="contained" onClick={insertionSort}>
            Ordenar con Insertion Sort
          </Button>
          <br />
          <br />    
          <Button variant="contained" onClick={mergeSort}>
            Ordenar con Merge Sort
          </Button>      
          <br />
          <br />    
          <Button variant="contained" onClick={heapSort}>
            Ordenar con Heap Sort
          </Button> 
          <br />
          <br />
          <Button variant="contained" onClick={quickSort}>
              Ordenar con Quick Sort
          </Button>
          <br />
          <br />
          <Button variant="contained" onClick={countingSort}>
            Ordenar con Counting Sort
          </Button>
          <br />
          <br />
          <Button variant="contained" onClick={bucketSort}>
            Ordenar con Bucket Sort
          </Button>
          <br />
          Este método no funciona como debería, hay un error en el render, 
          <br />
          aun así, arregla la lista en pares de buckets, solo a veces
          <br />
          al final regresa la lista a como estaba desordenada.
          <br />
          <br />
          <Button variant="outlined" href="https://www.youtube.com/watch?v=7RGQO02NYVY">
            Ordenar con Radix Sort
          </Button>
          <br />
          Este nunca nos jaló, pero si le da click se llevará una sorpresa. 
        </div>
        <Box mt={2} style={{ marginLeft: 50}}>
          
          {sortedLibros.map((libro) => (
            <p key={libro.id}>
              Id: {libro.id}
              <br />
              Nombre: {libro.nombre}
            </p>
          ))}
        </Box>
      </div>
    );
  };

  export default Ordenamientos;