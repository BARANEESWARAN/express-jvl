const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname));
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

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
