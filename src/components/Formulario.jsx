import { useState, useEffect, useMemo } from "react"
import Error from "./Error"
import Paciente from "./Paciente"

const Formulario = ({setPacientes, pacientes, setPaciente, paciente}) => {
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')

    const [error, setError] = useState(false)

    useEffect(() => {
        if(Object.keys(paciente).length > 0){
            console.log(paciente)
            const {nombre, email, fecha, propietario, sintomas, id} = paciente
            setNombre(nombre)
            setPropietario(propietario)
            setEmail(email)
            setFecha(fecha)
            setSintomas(sintomas)
        }
        }, [paciente])

    
    //console.log(paciente)

    const generarId = () => {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36).substring(2)

        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if([nombre, propietario, email, fecha, sintomas].includes('')){
            console.log('Hay al menos un campo vacio')
            setError(true)
            return
        } 

        setError(false)

        /*const objetoPaciente = { 
            nombre,
            propietario, 
            email, 
            fecha, 
            sintomas, 
            id: generarId() }*/

        const objetoPaciente = { 
            nombre,
            propietario, 
            email, 
            fecha, 
            sintomas }

        if(paciente.id){
            //editando registro
            objetoPaciente.id = paciente.id
            console.log('nuevo objeto', objetoPaciente)
            console.log('objeto anterior', paciente)

            //const pacientesActualizados = pacientes.map( pacienteMap => paciente.id !== pacienteMap.id)
            /*const pacientesActualizados = pacientes.filter( pacienteMap => paciente.id !== pacienteMap.id)
            setPacientes( [...pacientesActualizados, objetoPaciente] )
            console.log('pacientes actualizados', pacientesActualizados)*/

            const pacientesActualizados = pacientes.map( pacienteMap => pacienteMap.id === paciente.id ? objetoPaciente : pacienteMap)
            setPacientes(pacientesActualizados)
            setPaciente({})


        } else{
            //nuevo registro
            objetoPaciente.id = generarId()
            setPacientes( [...pacientes, objetoPaciente] )
        }

        //setPacientes( [...pacientes, objetoPaciente] )

        //reiniciar form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')

        //console.log('enviando...')
    }



    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">Anade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span> 
            </p>

            <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

                {error && <Error>
                    <h1>Hola mund</h1>
                    <p>Todos los campos son obligatorios</p>
                    </Error>
                }

                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre mascota
                    </label>
                    <input 
                    id="mascota"
                    type="text"
                    placeholder="Nombre de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={ e => setNombre(e.target.value) } />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>
                    <input 
                    id="propietario"
                    type="text"
                    placeholder="Nombre del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={ e => setPropietario(e.target.value) } />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input 
                    id="email"
                    type="email"
                    placeholder="Email Contacto Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={ e => setEmail(e.target.value) } />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Alta
                    </label>
                    <input 
                    id="alta"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={ e => setFecha(e.target.value) } />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Sintomas
                    </label>
                    
                    <textarea 
                    name="" 
                    id="sintomas" 
                    cols="30" 
                    rows="10"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Describe los sintomas"
                    value={sintomas}
                    onChange={ e => setSintomas(e.target.value) } />
                </div>

                <input 
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
                hover:bg-indigo-800 cursor-pointer transition-all"
                value={ paciente.id ? "Editar paciente" : "Agregar paciente" }
                />

            </form>
        </div>
    )
}

export default Formulario

