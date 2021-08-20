require("dotenv").config();
const express = require("express");
const db=require("./db");
const cors=require("cors");
const app=express();
const morgan=require("morgan");
const port= process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
//GPU AL
app.get("/api/gpus",async (req,res)=>{
    try {
    const results=await db.query("select * from gpu")
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{

            gpu:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//SINGLE GPU
app.get("/api/gpus/:id",async (req,res)=>{
    
    try {
        const results=await db.query("select * from gpu where id=$1",[req.params.id])
        res.status(200).json({
        status:"success",
        data:{
            gpu:results.rows
        }
    })
    } catch (err) {
        console.log(err.message);
    }

})
//CPU GET
app.get("/api/cpus",async (req,res)=>{
    try {
    const results=await db.query("select * from cpu order by id asc;")
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            cpu:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
app.get("/api/cpus/:id",async (req,res)=>{
    
    try {
        const results=await db.query("select * from cpu where id=$1",[req.params.id])
        res.status(200).json({
        status:"success",
        data:{
            cpu:results.rows
        }
    })
    } catch (err) {
        console.log(err.message);
    }

})
//MBOARDS GET
app.get("/api/mboards",async (req,res)=>{
    try {
    const results=await db.query("select * from mboard")
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            mboard:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//MBOARDS SINGLE GET
app.get("/api/mboards/:id",async (req,res)=>{
    try {
    const results=await db.query("select * from mboard where id=$1",[req.params.id])
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            mboard:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//GET PSU
app.get("/api/psus",async (req,res)=>{
    try {
    const results=await db.query("select * from psu")
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            psu:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//GET SINGLE PSU
app.get("/api/psus/:id",async (req,res)=>{
    try {
    const results=await db.query("select * from psu where id=$1",[req.params.id])
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            psu:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//GET COOLER
app.get("/api/coolers",async (req,res)=>{
    try {
    const results=await db.query("select * from cooler")
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            cooler:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//GET SINGLE COOLER
app.get("/api/coolers/:id",async (req,res)=>{
    try {
    const results=await db.query("select * from cooler where id=$1",[req.params.id])
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            cooler:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//GET RAM
app.get("/api/rams",async (req,res)=>{
    try {
    const results=await db.query("select * from ram")
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            ram:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//GET SINGLE RAM
app.get("/api/rams/:id",async (req,res)=>{
    try {
    const results=await db.query("select * from ram where id=$1",[req.params.id])
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            ram:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//GET STORAGE
app.get("/api/stors",async (req,res)=>{
    try {
    const results=await db.query("select * from storage")
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            stor:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//GET SINGLE STORAGE
app.get("/api/stors/:id",async (req,res)=>{
    try {
    const results=await db.query("select * from storage where id=$1",[req.params.id])
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            stor:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//GET KASA
app.get("/api/kasas",async (req,res)=>{
    try {
    const results=await db.query("select * from kasa")
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            kasa:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//GET SINGLE KASA
app.get("/api/kasas/:id",async (req,res)=>{
    try {
    const results=await db.query("select * from kasa where id=$1",[req.params.id])
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            kasa:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})

//GET SINGLE MONITOR
app.get("/api/mons/:id",async (req,res)=>{
    try {
    const results=await db.query("select * from monitor where id=$1",[req.params.id])
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            monitor:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//GET MONITOR
app.get("/api/mons",async (req,res)=>{
    try {
    const results=await db.query("select * from monitor")
    //console.log(results);
    res.status(200).json({
        status: "success",
        results:results.rows.length,
        data:{
            monitor:results.rows,
        },
    })
    } catch (err) {
        console.log(err.message);
    }
    
})
//SHOP GET
app.get("/api/shop",async (req,res)=>{
    try {
        const results=await db.query("SELECT * from shop ORDER BY shopid ASC;")
        res.status(200).json({
            status:"success",
            data:{
                shop:results.rows
            }
        })
    } catch (err) {
        console.log(err.message);
    }
})
//GPU ADD SHOP
app.put("/api/shop/gpu/:id",async (req,res)=>{
    try {
        const results = await db.query("UPDATE shop SET gpu=$1 where shopid=1",[req.body.gpu])
        //console.log(results);
        res.status(200).json({
             status:"success",
             data:{
                shop:results.rows
             }
         })
    } catch (err) {
        console.log(err.message);
    }
})
//CPU ADD SHOP
app.put("/api/shop/cpu/:id",async (req,res)=>{
    try {
        const results = await db.query("UPDATE shop SET cpu=$1 where shopid=1",[req.body.cpu])
        console.log(results);
        res.status(200).json({
             status:"success",
             data:{
                shop:results.rows
             }
         })
    } catch (err) {
        console.log(err.message);
    }
})
app.put("/api/shop/mboard/:id",async (req,res)=>{
    try {
        const results = await db.query("UPDATE shop SET mboard=$1 where shopid=1",[req.body.mboard])
        console.log(results);
        res.status(200).json({
             status:"success",
             data:{
                shop:results.rows
             }
         })
    } catch (err) {
        console.log(err.message);
    }
})
//PSU ADD SHOP
app.put("/api/shop/psu/:id",async (req,res)=>{
    try {
        const results = await db.query("UPDATE shop SET psu=$1 where shopid=1 returning *",[req.body.psu])
        console.log(results);
        res.status(200).json({
             status:"success",
             data:{
                shop:results.rows
             }
         })
    } catch (err) {
        console.log(err.message);
    }
})
//COOLER ADD SHOP
app.put("/api/shop/cooler/:id",async (req,res)=>{
    try {
        const results = await db.query("UPDATE shop SET cooler=$1 where shopid=1 returning *",[req.body.cooler])
        console.log(results);
        res.status(200).json({
             status:"success",
             data:{
                shop:results.rows
             }
         })
    } catch(err){
        console.log(err.message);
    }
})
//RAM ADD SHOP
app.put("/api/shop/ram/:id",async (req,res)=>{
    try {
        const results = await db.query("UPDATE shop SET ram=$1 where shopid=1 returning *",[req.body.ram])
        console.log(results);
        res.status(200).json({
             status:"success",
             data:{
                shop:results.rows
             }
         })
    } catch (err) {
        console.log(err.message);
    }
})
//STORAGE ADD SHOP
app.put("/api/shop/stor/:id",async (req,res)=>{
    try {
        const results = await db.query("UPDATE shop SET storage=$1 where shopid=1 returning *",[req.body.storage])
        console.log(results);
        res.status(200).json({
             status:"success",
             data:{
                shop:results.rows
             }
         })
    } catch (err) {
        console.log(err.message);
    }
})
//MONITOR ADD SHOP
app.put("/api/shop/mon/:id",async (req,res)=>{
    try {
        const results = await db.query("UPDATE shop SET monitor=$1 where shopid=1 returning *",[req.body.monitor])
        console.log(results);
        res.status(200).json({
             status:"success",
             data:{
                shop:results.rows
             }
         })
    } catch (err) {
        console.log(err.message);
    }
})
//KASA ADD SHOP
app.put("/api/shop/kasa/:id",async (req,res)=>{
    try {
        const results =await db.query("UPDATE shop SET kasa=$1 where shopid=1 returning *",[req.body.kasa])
        console.log(results);
        res.status(200).json({
             status:"success",
             data:{
                shop:results.rows
             }
         })
    } catch (err) {
        console.log(err.message);
    }
})
app.put("/api/shop/:id",async (req,res)=>{
    try {
        const results =await db.query("UPDATE shop SET totalprice=$1 where shopid=1 returning *",[req.body.totalprice])
        console.log(results);
        res.status(200).json({
             status:"success",
             data:{
                shop:results.rows
             }
         })
    } catch (err) {
        console.log(err.message);
    }
})
app.post("/api/shop/:id",async (req,res)=>{

    try {
        const results =await db.query("INSERT INTO shop(cpu,mboard,cooler,gpu,psu,kasa,ram,storage,monitor,totalprice)  SELECT cpu,mboard,cooler,gpu,psu,kasa,ram,storage,monitor,totalprice from shop WHERE shopid=1")
        res.status(201).json({
             status:"success",
             data:{
                shop:results.rows[0]
             }
         })
    } catch (error) {
        
    }
})
app.delete("/api/gpus/:id",(rec,res)=>{

})

app.listen(port,()=>{
    console.log(`server is up and listening ${port}`)
})