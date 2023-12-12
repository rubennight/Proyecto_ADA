import React from 'react'

import './App.css'
import { Box, Button, Collapse } from '@mui/material'
import Ordenamientos from './components/Ordenamientos'

function libro(id, idGenero ,nombre, autor, fechaDePublicacion, genero){
  return {id, idGenero ,nombre, autor, fechaDePublicacion, genero}
}

const libros = [
  libro(2, 1, "El Problema de los Tres Cuerpos", "Liu Cixin", 2008, "Ciencia ficción"),
  libro(3, 1, "Segunda Opción", "Autor 2", 2020, "Ciencia ficción"),
  libro(1, 2, "1984", "George Orwell", 1949, "Realismo mágico"),
  libro(6, 2, "Otro Libro", "Autor 3", 2015, "Realismo mágico"),
  libro(8, 3, "Sapiens: De animales a dioses", "Yuval Noah Harari", 2014, "Distopía"),
  libro(7, 3, "Libro de Distopía", "Autor 4", 2005, "Distopía"),
  libro(5, 4, "Matar a un ruiseñor", "Harper Lee", 1960, "Misterio, thriller"),
  libro(10, 4, "Otro Thriller", "Autor 5", 2018, "Misterio, thriller"),
  libro(4, 5, "El Alquimista", "Paulo Coelho", 1988, "Ficción, filosofía"),
  libro(9, 5, "Breve historia del tiempo", "Stephen Hawking", 1988, "Divulgación científica")
];


function App() {
  const [openLibros, setOpenLibros] = React.useState(false);

  return (
    <div>
      <h1>¡Bienvenida maestra, Vanessa!</h1>
      <h3>Aquí se encuentra el proyecto asignado  para la materia Análisis y Diseño de Algoritmos</h3>
      
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Box 
        style={{
          textAlign: 'left',
          padding: 20,
          backgroundColor: '#AEDEFC',
          borderRadius: 30,
          margin: 20 
          }}
      >
        <h3>Semestre: 3ro</h3>
        <h3>Grupo: D</h3>
        <h3>Modalidad: Semiescolarizado</h3>
        <h3>Profesor: Vanessa del Rosario Alcala Ramirez</h3>
        <h3>Equipo: Rubén Jiménez Navarro y Adán Gurrola Grijalva</h3>         
      </Box>
      

      <Box
        style={{
          textAlign: 'left',
          padding: 20,
          backgroundColor: '#FFE69A',
          borderRadius: 30,
          margin: 20  
          }}
      >
        ¡Aquí podremos ver un conjunto de libros, personalmente, son nuestros favoritos!
        <br />
        <br />
        <Button variant="text " onClick={() => setOpenLibros(!openLibros)}>Libros</Button>  
        <br />
        <br />
        <Collapse in={openLibros}>
          {libros.map((libro) => (
            <div key={libro.id}>
              <Box 
                style={{
                  border: '1px solid gray' ,
                  borderRadius: 10,
                  padding: 10
                }}
              >
                Id: {libro.id}
                <br />
                Id del genero: {libro.idGenero}
                <br />
                Nombre: {libro.nombre}
                <br />
                Autor: {libro.autor}
                <br />
                Año de publicación: {libro.fechaDePublicacion}
                <br />
                Género: {libro.genero}
              </Box>
              <br />
            </div>
          ))}          
        </Collapse>
      </Box>
      
      <br />

      </div>

      <Box
        style={{
          textAlign: 'left',
          padding: 20,
          backgroundColor: '#E8D3FF',
          borderRadius: 30,
          margin: 20  
        }}
      >
        Ahora podemos organizar estos libros con los siguientes algoritmos: 
        <br />
        Todos los métodos tienen por default en cada paso esperar 1000 milisegundos por lo cual hay que estar atentos cuando cambie el orden de la lista 
        <br />
        <br />
        <Ordenamientos libros={libros} />

      </Box>



    </div>
  )
}

export default App
