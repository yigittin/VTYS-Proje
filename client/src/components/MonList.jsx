import React,{useState,useEffect,useContext} from 'react'
import ComponentApi from '../apis/ComponentApi'
import './List.css'
import { ComponentsContext } from '../context/ComponentsContext'

const MonList = (props) => {
    const {components,setComponents,socket,setSocket,shopInfo,setShopInfo}= useContext(ComponentsContext)
   
    async function updateShop  (id){
             try {
             const updateShop=await ComponentApi.put(`/shop/mon/1`,{monitor:id})
            console.log(id);
           
         }
         catch(err){
             console.log(err.message);
         }
    }
     useEffect(()=>{
        const fetchData=async()=>{

            try {
                const response= await ComponentApi.get("/mons")               
                setComponents(response.data.data.monitor)
                
                
                
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
                        <th scope="col">Screen</th>
                        <th scope="col">Refresh Rate</th>
                        <th scope="col">Resolution</th>
                        <th scope="col">Panel</th>
                        <th scope="col">Price</th>
                        <th scope="col" className='text-inv'> </th>
                        

                    </tr>
                </thead>
                <tbody>
                    {components.map(comp=>{
                        return (

                        <tr key={comp.id}>
                            <td>{comp.momodel}</td>
                            <td>{comp.moscr}</td>
                            <td>{comp.morr} Hz</td>
                            <td>{comp.mores}</td>
                            <td>{comp.mopan} Mhz</td>                            
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

export default MonList
