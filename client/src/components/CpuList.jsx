import React,{useState,useEffect,useContext} from 'react'
import ComponentApi from '../apis/ComponentApi'
import './List.css'
import { ComponentsContext } from '../context/ComponentsContext'

const CpuList = (props) => {
    const {components,setComponents,socket,setSocket}= useContext(ComponentsContext)

     async function updateCpu  (id){
             try {
             const updateShop=await ComponentApi.put(`/shop/cpu/1`,{cpu:id})
            console.log(id);
           
         }
         catch(err){
             console.log(err.message);
         }
    }
     useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response= await ComponentApi.get("/cpus")
                setComponents(response.data.data.cpu)              
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
                        <th scope="col">Core Count</th>
                        <th scope="col">Core Clock</th>
                        <th scope="col">Boost Clock</th>
                        <th scope="col">Socket</th>

                        <th scope="col">Graphics</th>
                        <th scope="col">TDP</th>

                        <th scope="col">Price</th>
                        <th scope="col" className='text-inv'> </th>
                        

                    </tr>
                </thead>
                <tbody>
                {components.map(comp=>{
                        return (

                        <tr key={comp.id}>
                            <td>{comp.cpumodel}</td>
                            <td>{comp.cpucorecount}</td>
                            <td>{comp.cpucorecl} </td>
                            <td>{comp.cpuboostcl} </td>
                            <td>{comp.cpusocket} </td>

                            {comp.cpuig ?
                            <td>True</td> : <td>False</td>
                            }
                            

                            <td>{comp.cputdp} Watt</td>
                            <td>{comp.price} $</td>
                            <td>
                                
                                <a href="http://localhost:3000/"><button onClick={()=>updateCpu(comp.id)} className='btn btn-success'>ADD</button></a>
                            </td>

                        </tr>
                        )
                   })}
                    
                </tbody>
            </table>
            
        </div>
    )
}

export default CpuList
   