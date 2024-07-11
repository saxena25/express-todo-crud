const express = require("express");
const fs = require("fs")

const server = express();
const PORT = 3001;
server.use(express.json());

server.get("/todos",(req,res)=>{
    // const todos = JSON.stringify(fs.readFileSync("./db.json", "utf-8"));
    const todos = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    // const convertedTodos = JSON.parse(todos)
    res.json(todos);
});

server.post("/todo",(req,res)=>{
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    // console.log(data);
    data.data.push(req.body);
    console.log(req.body);
    // console.log(`data after push ${data.data}`);
    fs.writeFileSync("./db.json",JSON.stringify(data));
    res.send(`data Received successfully`);
});

server.patch("/todos/even",(req,res)=>{
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    data.todos.forEach((todo)=>{
        if(Number(todo.id) % 2 === 0 && todo.status === 'false'){
            todo.status = 'true';
        }
    });

    fs.writeFileSync("./db.json",JSON.stringify(data));
    console.log(data);
    res.send("Todos with even ID updated Successfully");
});

server.delete("/todos/delete",(req,res)=>{
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    data.todos = data.todos.filter((todo)=>todo.status === 'false');
    fs.writeFileSync("./db.json",JSON.stringify(data));
    console.log(data);
    res.send("Todos with the Status True are Deleted");
})



server.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})