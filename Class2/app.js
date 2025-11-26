// const http=require("http");

// http.createServer((req,res)=>{
//     res.end("Server is Created,My name is Ayush,This is Second class of node");
// }).listen("3000",()=>{
//     console.log("Listening at 3000")
// })

// What is FileSystem?

const fs=require("fs"); // we have to import the file system.

// fs.readFile("demo.txt","utf-8",(err,data)=>{
//     if(err) throw err;
//     else console.log(data)
// })

// if data is present it will be override and if fileis not present it will create a new file
// fs.writeFile("demo1.txt","This is new data",(err)=>{
//     if (err) throw err;
//     else console.log("Data has bee written")
// })

// fs.appendFile("demo1.txt","\n This is second line",(err)=>{
//     if(err) throw err
//     else console.log("Update the file")
// })

// fs.unlink("demo1.txt",(err)=>{
//     if (err) throw err
// })

// Callback hell
// fs.readFile("Data1.txt","utf-8",(err,data1)=>{
//     if(err) throw err;
//     fs.readFile("Data2.txt","utf-8",(err,data2)=>{
//         if (err) throw err;
//         fs.writeFile("Combined.txt",data1+data2,(err)=>{
//             if(err) throw err;
//         })
//     })
// })

// Promises
// const fs1=require("fs").promises;

// fs1.readFile("Data1.txt","utf-8") // promise : then & catch
// .then(data1=>fs1.readFile("Data2.txt","utf-8") // promise
// .then(data2=>fs1.readFile("Data3.txt","utf-8")
// .then(data3=>fs1.writeFile("Combined.txt",data1+data2+data3))));

// How to make a custom modules?

function add(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

module.exports= {add,sub};