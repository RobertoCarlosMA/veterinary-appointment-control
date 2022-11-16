import { useState, useEffect } from "react"
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []
      console.log(pacientesLS)
      setPacientes(pacientesLS)
    }

    obtenerLS()
  }, [])

  useEffect(() => {
    console.log('componente listo o cambio paciente')
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  const eliminarPaciente = id => {
    console.log('eliminando', id)
    const pacientesActualizados = pacientes.filter( pacienteFilter => pacienteFilter.id !== id)
    console.log('pacientes actualizados', pacientesActualizados)
    setPacientes(pacientesActualizados)
  }

  /*const imprime2mas2 = () => {
    console.log(2+2)
  }*/

  /*const toma1Valor = (valor) => {
    console.log(valor)
  }*/



  return (
    <div className="container mx-auto mt-20 bg-slate-400">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario
          setPacientes={setPacientes}
          pacientes={pacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
