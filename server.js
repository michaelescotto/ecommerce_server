import express from "express"

const server = express()
const port = 8000
server.get('/', (req,res)=>{res.send('prueba')})
const ready = () =>{console.log(`server ready on http://localhost:${port}`);}
server.listen(port,ready)