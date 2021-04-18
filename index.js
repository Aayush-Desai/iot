const express=require('express');
const path = require('path')
const {spawn} = require('child_process');
var awsIot = require('aws-iot-device-sdk');


const cors = require("cors");

//require("dotenv").config;
const app=express();
const bodyparser = require('body-parser');

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//this is the dumy data
app.post('/dumy',(req,res) =>{
    //console.log("Aayush");

    //python script runs from her
   var  streamdata="";
    const childProcess=spawn('python',['dumy.py',JSON.stringify(req.body)]);

    //console.log(req.body);
    childProcess.stdout.on('data',(pydata)=>{
        //var sdata=JSON.stringify(pydata);
        console.log(pydata.toString());
        console.log(parseInt(pydata.toString()));
        const jsdata=JSON.stringify(pydata);
        var data=JSON.parse(jsdata);
        streamdata=pydata.toString()[0];
    });
      childProcess.on('close',(code)=>{
        console.log(`child process close all stdio with code ${code}`)
        //const data=
        return res.send({message: streamdata.toString()});
      });
    //console.log("Aayush");
    //console.log(streamdata);
    
});

//this data get stored in AWS datastore
app.post('/aws',(req,res) =>{
  //console.log("Aayush");

  //python script runs from her
 var  streamdata="";
  const childProcess=spawn('python',['aws.py',JSON.stringify(req.body)]);

  //console.log(req.body);
  childProcess.stdout.on('data',(pydata)=>{
        //var sdata=JSON.stringify(pydata);
        console.log(pydata.toString());
        console.log(parseInt(pydata.toString()));
        const jsdata=JSON.stringify(pydata);
        var data=JSON.parse(jsdata);
        streamdata=pydata.toString()[0];
  });
    childProcess.on('close',(code)=>{
      console.log(`child process close all stdio with code ${code}`)
      //const data=
      return res.send({message: streamdata.toString()});
    });
  //console.log("Aayush");
  //console.log(streamdata);
  
});


app.all("*", (req, res) => {
    return res.json({ success: false, err_code: 404, message: "Invalid URL!" });
});

app.listen(process.env.PORT || 5000,() => {
    console.log("Server has Started on port 5000");
});