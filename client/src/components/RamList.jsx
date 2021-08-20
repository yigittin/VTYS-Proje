import React,{useState,useEffect,useContext} from 'react'
import ComponentApi from '../apis/ComponentApi'
import './List.css'
import { ComponentsContext } from '../context/ComponentsContext'

const RamList = (props) => {

    const {components,setComponents,socket,setSocket,shopInfo,setShopInfo}= useContext(ComponentsContext)
async function updateRam  (id){
             try {
             const updateShop=await ComponentApi.put(`/shop/ram/1`,{ram:id})
            console.log(id);
           
         }
         catch(err){
             console.log(err.message);
         }    }    
     useEffect(()=>{
        const fetchData=async()=>{

            try {
                const response= await ComponentApi.get("/rams")               
                setComponents(response.data.data.ram)
                
                
                
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
                        <th scope="col">Speed</th>
                        <th scope="col">Memory</th>
                        <th scope="col">Color</th>
                        <th scope="col">CAS</th>
                        <th scope="col">Price</th>
                        <th scope="col" className='text-inv'> </th>
                        

                    </tr>
                </thead>
                <tbody>
                    {components.map(comp=>{
                        return (

                        <tr key={comp.id}>
                            <td>{comp.rmodel}</td>
                            <td>{comp.rspeed}Mhz</td>
                            <td>{comp.rmodul} GB</td>
                            <td>{comp.rcolor} </td>
                            <td>{comp.rcas}</td>
                            <td>{comp.price} $</td>
                            <td>
                                <a href="http://localhost:3000/"><button onClick={()=>updateRam(comp.id)} className='btn btn-success'>ADD</button></a>
                                
                            </td>

                        </tr>
                        )
                   })}
                    
                </tbody>
            </table>
            
        </div>
    )
}

export default RamList
