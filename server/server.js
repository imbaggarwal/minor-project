const express = require("express");


//express server set-up
const app = express();

app.get("/",function(req,res){
    res.send("Hello");
    
});

app.listen(3000, function(){
    console.log("server started on port 3000");
});
