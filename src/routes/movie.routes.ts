import { Router } from "express";
import { upload } from "../middlewares/multer";

import { authenticateJWT } from "../middlewares/auth";
import MovieController from "../controllers/movie.controller";

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management
 */
const router = Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of movies
 *       500:
 *         description: Internal server error
 */
router.get("/", MovieController.getAll);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get movie details by ID
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The movie details
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", MovieController.getMovieDetails);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Add a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               publish_year:
 *                 type: integer
 *               userId:
 *                 type: string
 *               poster:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Movie added successfully
 *       400:
 *         description: Bad Request
 */
router.post("/", authenticateJWT, upload.single("poster"), MovieController.addMovie);
/**
 * @swagger
 * /movies/{id}:
 *   patch:
 *     summary: Update a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               publish_year:
 *                 type: integer
 *               poster:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 */
router.patch("/:id", authenticateJWT, upload.single("poster"), MovieController.updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticateJWT, MovieController.deleteMovie);

module.exports = router;
