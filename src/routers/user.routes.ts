import { Router } from "express";
import hashPassword from "./../middlewares/hashPassword";
const router = Router();
import { login, refershToken, signup } from "./../controllers/user.controller";

router.post("/login", login);
router.post("/signup", signup);
router.post("/refersh-token", refershToken);

module.exports = router;
