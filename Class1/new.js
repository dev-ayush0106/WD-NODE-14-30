// setTimeout(()=>{
//     console.log("This is Blocking Statment")
// },3000);

// console.log("We are starting backend");
const http=require("http"); // imported the module
// Want to create the server
http.createServer((req,res)=>{
    res.end("Listening to PORT 8080,This is new Content,hii");
    
}).listen(8080)
