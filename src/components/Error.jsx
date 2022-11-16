
const Error = ({message, children}) => {
    return (
        <div className="bg-red-800 text-white text-center p-3 uppercase font-bold m-3 rounded-md  ">
            {children}
        </div> 
    )
}

export default Error
