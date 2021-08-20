import React,{useState,useEffect,useContext} from 'react'
import ComponentApi from '../apis/ComponentApi'
import './List.css'
import { ComponentsContext } from '../context/ComponentsContext'

const GpuList = (props) => {
    const {components,setComponents,socket,setSocket,shopInfo,setShopInfo}= useContext(ComponentsContext)
    // const clickHandler=async ()=>{
       
    //     try {
    //         const updateShop=await ComponentApi.put(`/shop/gpu/1`,{fk_gpu:components.gid})
    //         console.log(components.gid);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
        
    // }
    async function updateShop  (id){
             try {
             const updateShop=await ComponentApi.put(`/shop/gpu/1`,{gpu:id})
            console.log(id);
           
         }
         catch(err){
             console.log(err.message);
         }
    }
     useEffect(()=>{
        const fetchData=async()=>{

            try {
                const response= await ComponentApi.get("/gpus")               
                setComponents(response.data.data.gpu)
                
                
                
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
                        <th scope="col">Chipset</th>
                        <th scope="col">Memory</th>
                        <th scope="col">Boost</th>
                        <th scope="col">TDP</th>
                        <th scope="col">Price</th>
                        <th scope="col" className='text-inv'> </th>
                        

                    </tr>
                </thead>
                <tbody>
                    {components.map(comp=>{
                        return (

                        <tr key={comp.id}>
                            <td>{comp.gmodel}</td>
                            <td>{comp.gchip}</td>
                            <td>{comp.gmem} GB</td>
                            <td>{comp.gboost} Mhz</td>
                            <td>{comp.gtdp} Watt</td>
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

export default GpuList
