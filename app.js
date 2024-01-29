const express=require("express")
const adminRoutes=require("./Routes/admin")
const shopRoutes=require("./Routes/shop")
const path=require("path")
const app=express()
const PORT=8000
const {engine}=require("express-handlebars")
const bodyParse =require("body-parser")

// app.engine("hbs",engine({extname:".hbs",defaultLayout:"../main"}))
// app.use(express.static(path.join(__dirname,"public")))
// app.set("view engine","hbs");
// // app.set("views", path.join(__dirname, "views"));

// app.use("/admin",adminRoutes)
// app.use(shopRoutes)
// app.use((req,res,next)=>{
//     res.render("404")
//     // req.status(404).sendFile(path.join(__dirname,"views","404.html"))
   
// })
// app.use(bodyParse.urlencoded())


// app.listen(PORT,(err)=>{
// if(err) throw err
// else{
//     console.log("running port"+PORT)
// }
// })

const multer = require("multer");



app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\.[^/.]+$/,"") + "_" + Date.now() + path.extname(file.originalname));
  }
});

let maxsize = 2 * 1000 * 1000;
const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxsize
  },
  fileFilter: function (req, file, cb) {
    let filetypes = /jpeg|jpg|png/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname.toLowerCase()));

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: Files only support the following formats: " + filetypes);
  }
}).single("mypic");

app.get("/", (req, res) => {
  res.render("signup");
});
app.post("/upload", (req, res,next) => {
 upload(req,res,function(err){
    if(err){

        if(err instanceof multer.MulterError && err.code==="LIMIT_FILE_SIZE"){
            return res.send("maximum file size 2mb")
        }
        res.send(err)
    }
    else{
        res.send("image uploaded success!")
    }
 })
});


app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
