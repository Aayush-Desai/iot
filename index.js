const express=require('express');
//require("dotenv").config;
const app=express();
//const pool=require("./db");


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get("/",() =>{
    console.log("Hii");
});
app.listen(5000,() => {
    console.log("Server has Started on port 5000");
});