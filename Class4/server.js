const express=require("express"); // required the express
const app=express() // created the server

app.listen(3000,()=>{
    console.log("Listening at Port 3000")
})

app.use(express.json()) // middleware

// get , post , put , delete
// API : Application programming interface

app.get("/home",(req,res)=>{ // to fetch all the registered data
    res.send("Welcome to Express JS")
})

// req.body
app.post("/post",(req,res)=>{ // to post a new data
    console.log(req.body)
    res.send("Post the Data")
})

// req.params
app.get("/student/:id",(req,res)=>{
    const {id} = req.params
    res.send(`Data of Student ${id}`)
})

// req.query
app.get("/detail",(req,res)=>{
    console.log(req.query)
    const {name,city}=req.query
    res.send(`Details of Student\n Name:${name} City:${city}`)
})

app.put("/update",(req,res)=>{ // to update the existing data
    res.send("This is update Request")
})

app.delete("/delete",(req,res)=>{ // to delete the data
    res.send("Delete Request")
})


// params, query & body