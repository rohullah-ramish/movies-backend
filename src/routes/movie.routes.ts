import { Router } from "express";
import { upload } from "../middlewares/multer";

import { authenticateJWT } from "../middlewares/auth";
import MovieController from "../controllers/movie.controller";

const router = Router();

router.get("/", authenticateJWT, MovieController.getAll);
router.get("/:id", authenticateJWT, MovieController.getAll);
router.post("/", authenticateJWT, upload.single("poster"), MovieController.addMovie);
router.patch("/:id", authenticateJWT, upload.single("poster"), MovieController.updateMovie);
router.delete("/:id", authenticateJWT, MovieController.deleteMovie);

module.exports = router;
