import React,{useState, createContext} from "react";
export const ComponentsContext=createContext();

export const ComponentsContextProvider=(props)=>{
    const [components,setComponents] = useState([]);
    const [socket,setSocket]=useState('')
    const [shopInfo,setShopInfo]=useState('')
    return(
        <ComponentsContext.Provider value={{components,setComponents,socket,setSocket,shopInfo,setShopInfo}}>
            {props.children}
        </ComponentsContext.Provider>
    );
};