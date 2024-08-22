import { Router } from "express";
import UserController from "../controllers/user.controller";
const router = Router();


router.post("/login", UserController.login);
router.post("/signup", UserController.signup);
router.post("/refresh-token", UserController.refreshToken);

module.exports = router;
