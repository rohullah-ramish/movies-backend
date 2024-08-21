import { Router } from "express";
import hashPassword from './../middlewares/hashPassword';
const router = Router();
import  {login,signup} from './../controllers/user.controller'


router.post("/login",login);
router.post("/signup",hashPassword,signup)


module.exports = router;