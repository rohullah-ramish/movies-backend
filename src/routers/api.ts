const express = require("express");
const userRoute = require('./user.routes');
const MovieRoute = require('./movie.routes');



const router = express.Router();


router.use('/users',userRoute);
router.use('/movies',MovieRoute);


module.exports = router