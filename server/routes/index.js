const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../modals/user-modal");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedin, async function (req, res) {
  let products = await productModel.find();
  res.render("shop", { products });
});

router.get("/addtocart/:id", isLoggedin, async function (req, res) {
  let user = await userModel.findOne({email: req.user.email});
  
});

router.get("/logout", isLoggedin, function (req, res) {
  res.render("shop");
});

module.exports = router;