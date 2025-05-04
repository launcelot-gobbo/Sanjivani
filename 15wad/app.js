const express=require('express');
const fs=require('fs');
const app=express();

app.use(express.static('public'));

app.get('/api/products',(req,res)=>{
    fs.readFile('./data/products.json','utf8',(err,data)=>{
        if(err)return res.sendStatus(500);
        res.json(JSON.parse(data));
    });
});

app.listen(3000,()=>console.log('Server running on http://localhost:3000'));