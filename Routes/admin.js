const express = require("express");
const router = express.Router();
const app = express();
const path = require("path");
const rootDir = require("../utilis/path");



router.get("/add-product", (req, res, next) => {
  res.render("addproduct",{shopname:"barani"}); // Assuming you have a Pug file named "shop.pug" in the "views" directory
});

router.post("/store", (req, res, next) => {
  res.send("<h1>Store submitted</h1>");
  console.log("body data:", req.body);
});

module.exports = router;
