import { Router } from "express";
import { upload } from "../middlewares/multer";
import {
    getMovieList,
    addMovie,
    deleteMovie,
    updateMovie,
} from "../controllers/movie.controller";
import { authenticateJWT } from "../middlewares/auth";
const router = Router();
router.get("/", authenticateJWT, getMovieList);
router.post("/",authenticateJWT,upload.single('poster'), addMovie);
router.patch("/:id",authenticateJWT,upload.single('poster'), updateMovie);
router.delete("/:id",authenticateJWT ,deleteMovie);

module.exports = router;
