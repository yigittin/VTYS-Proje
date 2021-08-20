import e from 'cors'
import React , {useEffect,useContext,useState} from 'react'
import {BrowserRouter as Link} from 'react-router-dom'
import ComponentApi from '../apis/ComponentApi'
import { ComponentsContext } from '../context/ComponentsContext'
import './List.css'
const List = () => {
    
    const [gpuId,setGpuId]=useState(0)
    const [gpuName,setGpuName]=useState('')
    const [gpuPrice,setGpuPrice]=useState(0)

    const [cpuId,setCpuId]=useState(0)
    const [cpuName,setCpuName]=useState('')
    const [cpuPrice,setCpuPrice]=useState(0)

    const [mboardId,setMboardId]=useState(0)
    const [mboardName,setMboardName]=useState('')
    const [mboardPrice,setMboardPrice]=useState(0)

    const [coolerId,setCoolerId]=useState(0)
    const [coolerName,setCoolerName]=useState('')
    const [coolerPrice,setCoolerPrice]=useState(0)

    const [psuId,setPsuId]=useState(0)
    const [psuName,setPsuName]=useState('')
    const [psuPrice,setPsuPrice]=useState(0)

    const [kasaId,setKasaId]=useState(0)
    const [kasaName,setKasaName]=useState('')
    const [kasaPrice,setKasaPrice]=useState(0)

    const [ramId,setRamId]=useState(0)
    const [ramName,setRamName]=useState('')
    const [ramPrice,setRamPrice]=useState(0)

    const [storId,setStorId]=useState(0)
    const [storName,setStorName]=useState('')
    const [storPrice,setStorPrice]=useState(0)

    const [monId,setMonId]=useState(0)
    const [monName,setMonName]=useState('')
    const [monPrice,setMonPrice]=useState(0)

    const [shopId,setShopId]=useState(0);

    const [totalPrice,setTotalPrice]=useState(1)

    const [refresh,setRefresh]=useState(0)

    const {components,setComponents,socket,setSocket,shopInfo,setShopInfo}=useContext(ComponentsContext)
     let value=0;
    function clickHandler(){    
        
        ++value
        setRefresh(value)
        setTimeout(()=>{
            ++value
            setRefresh(value)
        },1500)
        
    }
    useEffect(()=>{
       const fetchData=async()=>{
   
           try {
                const response= await ComponentApi.get("/shop")               
                
                setComponents(response.data.data.shop)
                setGpuId(components[0].gpu)
                setCpuId(components[0].cpu)
                setPsuId(components[0].psu)
                setMboardId(components[0].mboard)
                setCoolerId(components[0].cooler)
                setRamId(components[0].ram)
                setMonId(components[0].monitor)
                setKasaId(components[0].kasa)
                setStorId(components[0].storage)
                //console.log(components[0].fk_psu);
                if(gpuId){
                    const gpu= await ComponentApi.get(`/gpus/${gpuId}`)
                    setGpuName(gpu.data.data.gpu[0].gmodel)
                setGpuPrice(gpu.data.data.gpu[0].price)
                }
                if(cpuId){
                    
                    const cpu= await ComponentApi.get(`/cpus/${cpuId}`)
                    setCpuName(cpu.data.data.cpu[0].cpumodel)
                    setCpuPrice(cpu.data.data.cpu[0].price)

                }
                if(psuId){

                    const psu= await ComponentApi.get(`/psus/${psuId}`)
                    setPsuName(psu.data.data.psu[0].psumodel)
                setPsuPrice(psu.data.data.psu[0].price)
                }
                if(coolerId){
                    const cooler= await ComponentApi.get(`/coolers/${coolerId}`)
                    
                setCoolerName(cooler.data.data.cooler[0].coolmodel)
                setCoolerPrice(cooler.data.data.cooler[0].price)

                }
                
                if(mboardId){
                    const mboard= await ComponentApi.get(`/mboards/${mboardId}`)
                     setMboardName(mboard.data.data.mboard[0].mmodel)
                setMboardPrice(mboard.data.data.mboard[0].price)

                }

                if(ramId){
                    const ram= await ComponentApi.get(`/rams/${ramId}`)
                    setRamName(ram.data.data.ram[0].rmodel)
                    setRamPrice(ram.data.data.ram[0].price)
                }
                if(monId){

                    const mon= await ComponentApi.get(`/mons/${monId}`)
                    setMonName(mon.data.data.monitor[0].momodel)
                setMonPrice(mon.data.data.monitor[0].price)
                }
                if(kasaId){
                    const kasa= await ComponentApi.get(`kasas/${kasaId}`)
                    setKasaName(kasa.data.data.kasa[0].kasamodel)
                    setKasaPrice(kasa.data.data.kasa[0].price)
                }
                if(storId){
                    const storage= await ComponentApi.get(`/stors/${storId}`)
                        setStorName(storage.data.data.stor[0].stmodel)
                        setStorPrice(storage.data.data.stor[0].price)
                }

                
                
               
                
                
                
                
                


                setTotalPrice(psuPrice+coolerPrice+cpuPrice+gpuPrice+mboardPrice+ramPrice+monPrice+storPrice+kasaPrice)
                const price =await ComponentApi.put(`/shop/1`,{totalprice:totalPrice});
                //console.log(psuPrice);
              
           } catch (err) {
               console.log(err.message);
           }
       }
        fetchData();
    },[refresh,shopId])

   const deleteHandler= async (part)=>{
    //setTotalPrice(psuPrice+coolerPrice+cpuPrice+gpuPrice+mboardPrice+ramPrice+monPrice+storPrice+kasaPrice)
    if(part==='cpu'){
        setCpuName(null)
        setCpuPrice(0)
          try {
             const updateShop=await ComponentApi.put(`/shop/cpu/1`,{cpu:null})
            
           
         }
         catch(err){
             console.log(err.message);
         }
    }
    if(part==='gpu'){
        setGpuName(null)
        setGpuPrice(0)
          try {
             const updateShop=await ComponentApi.put(`/shop/gpu/1`,{gpu:null})
            
           
         }
         catch(err){
             console.log(err.message);
         }
    }
    if(part==='psu'){
        setPsuName(null)
        setPsuPrice(0)
         try {
             const updateShop=await ComponentApi.put(`/shop/psu/1`,{psu:null})
            
           
         }
         catch(err){
             console.log(err.message);
         }
    }
    if(part==='ram'){
       
         try {
             const updateShop=await ComponentApi.put(`/shop/ram/1`,{fk_ram:null})
            
           
         }
         catch(err){
             console.log(err.message);
         }
          setRamName(null)
        setRamPrice(0)
    }
    if(part==='mboard'){
        
         try {
             const updateShop=await ComponentApi.put(`/shop/mboard/1`,{fk_mboard:null})
            
           
         }
         catch(err){
             console.log(err.message);
         }
         setMboardName(null)
        setMboardPrice(0)
    }
    if(part==='mon'){
       
         try {
             const updateShop=await ComponentApi.put(`/shop/mon/1`,{fk_mon:null})
            
           
         }
         catch(err){
             console.log(err.message);
         }
          setMonName(null)
        setMonPrice(0)
    }
    if(part==='storage'){
       
         try {
             const updateShop=await ComponentApi.put(`/shop/stor/1`,{fk_stor:null})
            
           
         }
         catch(err){
             console.log(err.message);
         }
          setStorName(null)
        setStorPrice(0)
    }
    if(part==='kasa'){
        
         try {
             const updateShop=await ComponentApi.put(`/shop/kasa/1`,{fk_kasa:null})
            
           
         }
         catch(err){
             console.log(err.message);
         }
         setKasaName(null)
        setKasaPrice(0)
    }
    if(part==='cooler'){
       
         try {
             const updateShop=await ComponentApi.put(`/shop/cooler/1`,{fk_cooler:null})
            
           
         }
         catch(err){
             console.log(err.message);
         }
          setCoolerName(null)
        setCoolerPrice(0)
    }
    setTotalPrice(psuPrice+coolerPrice+cpuPrice+gpuPrice+mboardPrice+ramPrice+monPrice+storPrice+kasaPrice)
   }
       
   const saveHandler=async ()=>{   
       console.log(shopId);
        try {
            const newShop=await ComponentApi.post(`/shop/${shopId+3}`)            
            setShopId(shopId-1)
            console.log(shopId);
        } catch (error) {
            
        }
   }
  
    return (
        <div className='list-group m-5 '>
            <button className='btn btn-success ' onClick={clickHandler}>Refresh</button>
            <table className="tablo-ana table table-hover ">
                <thead>
                    <tr className="baslik-ana bg-primary text-white ">
                        <th scope="col">Component</th>
                        <th scope="col">Selection</th>
                        <th scope="col">Price</th>
                        <th scope="col"> </th>

                    </tr>
                </thead>
                <tbody>                    
                    <tr>
                        <td>CPU</td>
                        <td>{cpuName || <a href="http://localhost:3000/cpu"><button className='btn btn-success'>ADD</button></a>}</td>
                        <td>{`${cpuPrice} $`|| ''}</td>
                        <td>
                            <button onClick={()=>deleteHandler('cpu')} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                     <tr>
                        <td>GPU</td>
                        <td>{gpuName ||  <a href="http://localhost:3000/gpu"><button className='btn btn-success'>ADD</button></a>}</td>
                        <td>{`${gpuPrice} $`|| ''}</td>
                        <td>
                            <button onClick={()=>deleteHandler('gpu')} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                       <tr>
                        <td>MBOARD</td>
                        <td>{mboardName ||  <a href="http://localhost:3000/mboard"><button className='btn btn-success'>ADD</button></a>}</td>
                        <td>{`${mboardPrice} $`|| ''}</td>
                        <td>
                            <button onClick={()=>deleteHandler('mboard')} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                       <tr>
                        <td>COOLER</td>
                        <td>{coolerName ||  <a href="http://localhost:3000/cooler"><button className='btn btn-success'>ADD</button></a>}</td>
                        <td>{`${coolerPrice} $`|| ''}</td>
                        <td>
                            <button onClick={()=>deleteHandler('cooler')} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                       <tr>
                        <td>PSU</td>
                        <td>{psuName ||  <a href="http://localhost:3000/psu"><button className='btn btn-success'>ADD</button></a>}</td>
                        <td>{`${psuPrice} $`|| ''}</td>
                        <td>
                            <button  onClick={()=>deleteHandler('psu')} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>MEMORY</td>
                        <td>{ramName ||  <a href="http://localhost:3000/ram"><button className='btn btn-success'>ADD</button></a>}</td>
                        <td>{`${ramPrice} $`|| ''}</td>
                        <td>
                            <button onClick={()=>deleteHandler('ram')} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>STORAGE</td>
                        <td>{storName ||  <a href="http://localhost:3000/storage"><button className='btn btn-success'>ADD</button></a>}</td>
                        <td>{`${storPrice} $`|| ''}</td>
                        <td>
                            <button onClick={()=>deleteHandler('storage')} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                     <tr>
                        <td>CASE</td>
                        <td>{kasaName ||  <a href="http://localhost:3000/kasa"><button className='btn btn-success'>ADD</button></a>}</td>
                        <td>{`${kasaPrice} $`|| ''}</td>
                        <td>
                            <button onClick={()=>deleteHandler('kasa')} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>                    
                    <tr>
                        <td>MONITOR</td>
                        <td>{monName ||  <a href="http://localhost:3000/mon"><button className='btn btn-success'>ADD</button></a>}</td>
                        <td>{`${monPrice} $`|| ''}</td>
                        <td>
                            <button onClick={()=>deleteHandler('mon')} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <p className='total'>
                Total Price : {totalPrice} $ 
                
                </p>
                </div>
      <div>
    <button onClick={()=>saveHandler()} className="btn btn-outline-success " type="button">BUY</button>

      </div>

        </div>
    )
}

export default List
