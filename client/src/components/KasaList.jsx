import React,{useState,useEffect,useContext} from 'react'
import ComponentApi from '../apis/ComponentApi'
import './List.css'
import { ComponentsContext } from '../context/ComponentsContext'

const KasaList = (props) => {
    const {components,setComponents,socket,setSocket,shopInfo,setShopInfo}= useContext(ComponentsContext)
  
   async function updateShop  (id){
             try {
             const updateShop=await ComponentApi.put(`/shop/kasa/1`,{kasa:id})
            console.log(id);
           
         }
         catch(err){
             console.log(err.message);
         }
    }
     useEffect(()=>{
        const fetchData=async()=>{

            try {
                const response= await ComponentApi.get("/kasas")               
                setComponents(response.data.data.kasa)
                
                
                
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchData();
    },[])

    return (
        <div className='list-group m-5 '>                  
            <table className="tablo-ana table table-hover table-sm table-responsive">
                <thead  className="baslik-ana bg-primary text-white">
                    <tr>
                        <th scope="col">Model</th>
                        <th scope="col">Type</th>
                        <th scope="col">Color</th>
                        <th scope="col">Panel</th>                        
                        <th scope="col">Price</th>
                        <th scope="col" className='text-inv'> </th>
                        

                    </tr>
                </thead>
                <tbody>
                    {components.map(comp=>{
                        return (

                        <tr key={comp.id}>
                            <td>{comp.kasamodel}</td>
                            <td>{comp.kasatype}</td>
                            <td>{comp.kasacolor}</td>
                            <td>{comp.kasapanel}</td>                            
                            <td>{comp.price} $</td>
                            <td >
                                <a href="http://localhost:3000/"><button onClick={()=>updateShop(comp.id)} className='btn btn-success'>ADD</button></a>
                               
                            </td>

                        </tr>
                        )
                   })}
                    
                </tbody>
            </table>
            
        </div>
    )
}

export default KasaList
