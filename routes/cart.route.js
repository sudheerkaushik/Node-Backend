const express = require('express'),
app = express(),
router = express.Router(),
cart_controller = require('../controllers/cart.controller');

//*************** cart ***************
/* 

router.get("/api/cart/:id",cart_controller.get_cart_byId);

router.post("/api/cart/",cart_controller.fillCart); */

router.get("/api/cart", cart_controller.getCartItems);

router.post("/api/cart",cart_controller.addTocart);

router.delete("/api/cart/:id",cart_controller.deleteFromCart);

module.exports = router;
