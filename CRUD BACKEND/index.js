const express = require('express');
const mongoose = require('mongoose');
const app =express();

//connection to mongodb
mongoose.connect("mongodb://localhost:27017/pms",{useUnifiedTopology:true,useNewUrlParser:true},()=>{
    console.log("Connected to MongoDB Server Successfully");
})

// schema for products collection
let productSchema=new mongoose.Schema({
    
        name: String,
        price: Number,
        cateogry: String,
        quantity: Number,
        color: String,
        desc: String,
        rating: Number
      
});
let productModel = new mongoose.model('products',productSchema);

//use of middleware to convert unreadable data to readable data
app.use(express.json());

// to fetch all products
app.get('/products',async(req,res)=>{
    let products= await productModel.find();
    res.send(products);
})
// to create a new products
app.post("/products",(req,res)=>{
    let product = req.body;
    let proObj = new productModel(product);
    proObj.save();
    res.send("Products Created");
})

// to delete a product
app.delete("/products/:id",async (req,res)=>{ 
    await productModel.deleteOne({"_id":req.params.id});
    res.send("Product Deleted");
});

// to update a product
app.put("/products/:id",async (req,res)=>{
    const id=req.params.id;
    const data=req.body;

    await productModel.updateOne({"_id":id},{$set:data});
    res.send("product updated");
})


// creating and starting a server
app.listen(3000,function(){
    console.log("Server is running");
});