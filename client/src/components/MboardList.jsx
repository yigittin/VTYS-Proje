import React,{useState,useEffect,useContext} from 'react'
import ComponentApi from '../apis/ComponentApi'
import './List.css'
import { ComponentsContext } from '../context/ComponentsContext'

const Mboard = (props) => {
    const {components,setComponents,socket,setSocket,shopInfo,setShopInfo}= useContext(ComponentsContext)
    async function updateMboard  (id){
             try {
             const updateShop=await ComponentApi.put(`/shop/mboard/1`,{mboard:id})
            console.log(id);
           
         }
         catch(err){
             console.log(err.message);
         }
    }
    useEffect(()=>{
        const fetchData=async()=>{

            try {
                const response= await ComponentApi.get("/mboards")
                const deneme =await ComponentApi.get("/shop")
                
                setComponents(response.data.data.mboard)                
                setShopInfo(deneme.data.data.shop[0].cpu)
                console.log(deneme.data.data.shop[0].cpu);
                const deneme2 =await ComponentApi.get(`/cpus/${shopInfo}`)
                setSocket(deneme2.data.data.cpu[0].cpusocket)
                //console.log(socket);
                //console.log(components)
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchData();
    },[shopInfo])

    return (
        <div className='list-group m-5 '>   
               <h6> CPU Socket: {socket}</h6>
            <table className="tablo-ana table table-hover table-sm table-responsive">
                <thead  className="baslik-ana bg-primary text-white">
                    <tr>
                        <th scope="col">Model</th>
                        <th scope="col">Socket</th>
                        <th scope="col">Memory</th>
                        <th scope="col">Slots</th>
                        <th scope="col">Color</th>
                        <th scope="col">Price</th>
                        <th scope="col" className='text-inv'> </th>
                        

                    </tr>
                </thead>
                <tbody>
                    {components.map(comp=>{
                        return (
                            
                        <tr key={comp.id}>
                            {comp.msocket===socket &&                           
                            <>
                            <td>{comp.mmodel}</td>
                            <td>{comp.msocket}</td>
                            <td>{comp.mmem} GB</td>
                            <td>{comp.mslots}</td>
                            <td>{comp.mcolor}</td>
                            <td>{comp.price} $</td>
                            <td>
                                <a href="http://localhost:3000/"><button onClick={()=>updateMboard(comp.id)} className='btn btn-success'>ADD</button></a>
                                
                            </td>                           

                           </> 
                        }
                        </tr>
                            
                        )
                   })}
                    
                </tbody>
            </table>
            
        </div>
    )
}

export default Mboard
