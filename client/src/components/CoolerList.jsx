import React,{useState,useEffect,useContext} from 'react'
import ComponentApi from '../apis/ComponentApi'
import './List.css'
import { ComponentsContext } from '../context/ComponentsContext'

const CoolerList = (props) => {
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
             const updateShop=await ComponentApi.put(`/shop/cooler/1`,{cooler:id})             
            console.log(id);
           
         }
         catch(err){
             console.log(err.message);
         }
    }
     useEffect(()=>{
        const fetchData=async()=>{

            try {
                const response= await ComponentApi.get("/coolers")               
                setComponents(response.data.data.cooler)
                
                
                
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
                        <th scope="col">RPM</th>
                        <th scope="col">Noise</th>
                        <th scope="col">Color</th>
                        <th scope="col">Size</th>
                        <th scope="col">Price</th>
                        <th scope="col" className='text-inv'> </th>
                        

                    </tr>
                </thead>
                <tbody>
                    {components.map(comp=>{
                        return (

                        <tr key={comp.id}>
                            <td>{comp.coolmodel}</td>
                            <td>{comp.coolrpm}</td>
                            <td>{comp.coolnoise} Db</td>
                            <td>{comp.coolcol}</td>
                            <td>{comp.coolsize} </td>
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

export default CoolerList
