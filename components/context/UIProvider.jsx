import { useState } from "react"
import { UIContext } from "../context"

const UI_INITIAL_STATE = {
    variable: "",
}

export const UIProvider = ( { children }) => {

    const [recibido, setRecibido] = useState("")
    const seleccion = (e) =>{
        setRecibido(e)
    }

    return (
        <UIContext.Provider value={{
           variable: recibido,
           seleccion,
        }}> 
        { children }
        </UIContext.Provider>
    )
}



