  import { Button, Box, Divider } from '@mui/material';
  import React, { useState } from 'react';

  const Ordenamientos = ({ libros }) => {
    const [sortedLibros, setSortedLibros] = useState([...libros]);

    
  const resetLibros = () => {
    setSortedLibros([...libros]);
  };

  const bubbleSort = () => {
    const n = sortedLibros.length;
    let tempLibros = [...sortedLibros];
    let swapped;

    let i = 0;
    let j = 0;

    const sortStep = () => {
      if (i < n - 1) {
        if (tempLibros[i].id > tempLibros[i + 1].id) {
          // Swap libros
          [tempLibros[i], tempLibros[i + 1]] = [tempLibros[i + 1], tempLibros[i]];
          swapped = true;

          // Update state to trigger re-render
          setSortedLibros([...tempLibros]);
        }
        i++;
        } else {
          i = 0;
          if (!swapped) {
            // Si no hubo intercambios, el arreglo está ordenado
            setShowSteps(true);
            return;
          }
          swapped = false;
          j++;
        }

        // Siguiente iteración
        setTimeout(sortStep, 1000); // Ajusta el retardo según sea necesario
      };

      // Comienza el proceso de ordenamiento
      sortStep();
    };

    const insertionSort = () => {
      let tempLibros = [...sortedLibros];

      const performInsertionSort = async () => {
        for (let i = 1; i < tempLibros.length; i++) {
          let j = i - 1;
          const currentLibro = tempLibros[i];

          while (j >= 0 && tempLibros[j].id > currentLibro.id) {
            // Swap libros
            tempLibros[j + 1] = tempLibros[j];
            tempLibros[j] = currentLibro;

            // Update state to trigger re-render after each swap
            setSortedLibros([...tempLibros]);

            // Wait for 1000 miliseconds
            await new Promise(resolve => setTimeout(resolve, 1000));

            j--;
          }
        }
      };

      // Start the insertion sort process
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