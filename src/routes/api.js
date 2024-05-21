const express = require('express');
const UsersController = require("../controllers/UsersController")
const ItemsController = require("../controllers/ItemsController")
const OrdersController = require("../controllers/OrdersController")
const router = express.Router();

router.post("/registration",UsersController.registration)
router.post("/login",UsersController.login)

router.post("/foodData",ItemsController.foodData)

router.post("/orderData",OrdersController.orderData)
router.post("/myOrderData",OrdersController.myOrderData)


module.exports = router;