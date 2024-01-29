const express=require("express")
const path=require("path")
const router=express.Router()
const rootDir=require("../utilis/path")

router.get("/",(req,res,next)=>{
// res.sendFile(path.join(rootDir,"views","shop.html"))
const products = [
    // { name: 'Product 1', price: 10 },
    // { name: 'Product 2', price: 20 },
    // { name: 'Product 3', price: 30 }
  ];
res.render("shopdata",{shopname:"barani",products,productExists:products.length>0})
})
module.exports=router