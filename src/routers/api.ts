const express = require("express");
const userRoute = require('./user.routes');



const router = express.Router();


router.use('/users',userRoute);


module.exports = router