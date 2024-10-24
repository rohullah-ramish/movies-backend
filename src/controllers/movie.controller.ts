import { Request, Response } from "express";
import MovieService from "../services/movie.service";
import cloudinary from "../db/cloudinary.config";
import { Types } from "mongoose";

class MovieController {
  static async getAll(req: Request, res: Response) {
    try {
      // const user = (req as any).user;
      const options = {
        population: [
          {
            path: "userId",
            select: "email",
          },
        ],
      };
      // for default pagination
      const { page = 1, limit = 10, search, year } = req.query;
      const filter: { [key: string]: any } = {
        // userId: new Types.ObjectId(user.id),
        isDeleted: false,
      };

      if (search) {
        filter["title"] = { $regex: search || "", $options: "i" };
      }
      if (year) {
        filter["publish_year"] = Number(year);
      }
      const list = await MovieService.getMany(filter, options, { page, limit });
      const total = await MovieService.getDocumentCount({
        // userId: new Types.ObjectId(user.id),
        ...filter,
        isDeleted: false,
      });

      return res.status(200).json({
        message: "movies list !",
        data: list,
        total: Math.ceil(total.length / Number(limit)),
        currentPage: page,
        limit,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
        success: false,
      });
    }
  }

  static async addMovie(req: Request, res: Response) {
    try {
      const user = (req as any).user;

      const file = req.file;

      if (!file) {
        return res
          .status(400)
          .json({ message: "No file uploaded", success: false });
      }

      // Upload to Cloudinary
      const result = await cloudinary.v2.uploader.upload(file.path);

      // Get the image URL
      const imageUrl = result.secure_url;
      const { title, publish_year } = req.body;
      const body = {
        userId: user.id,
        title,
        publish_year,
        poster: imageUrl,
      };
      const createMovie = await MovieService.create(body);
      if (createMovie) {
        return res
          .status(200)
          .json({ message: "Movie Added !", createMovie, success: true });
      } else {
        return res.status(400).json({
          message: "error for add movie !",
          createMovie,
          success: false,
        });
      }
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
        success: false,
      });
    }
  }

  static async updateMovie(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const { id } = req.params;
      const file = req.file;
      const movie = await MovieService.getSingle({ _id: id });

      if (!movie) {
        return res
          .status(404)
          .json({ message: "Movie not found", success: false });
      }
      if (!file) {
        // simple updatte by mongose
        const { title, publish_year, poster } = req.body;
        const body = {
          userId: user.id,
          title,
          publish_year,
          poster,
        };
        const updated = await MovieService.update(id, body);
        return res
          .status(200)
          .json({ message: "Movie found", data: updated, success: true });
      } else {
        const oldPublicId = movie.poster.split("/").pop()?.split(".")[0];
        if (oldPublicId) {
          await cloudinary.v2.uploader.destroy(oldPublicId);
        }

        // Upload to Cloudinary
        const result = await cloudinary.v2.uploader.upload(file.path);

        // Get the image URL
        const imageUrl = result.secure_url;
        const { title, publish_year } = req.body;
        const body = {
          userId: user.id,
          title,
          publish_year,
          poster: imageUrl,
        };
        const updated = await MovieService.update(id, body);
        return res
          .status(200)
          .json({ message: "Movie Updated", data: updated, success: true });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
        success: false,
      });
    }
  }

  static async deleteMovie(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await MovieService.update(id, { isDeleted: true });
      return res
        .status(200)
        .json({ message: "Movie Deleted", data: updated, success: true });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
        success: false,
      });
    }
  }

  static async getMovieDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // const user = (req as any).user;
      const details = await MovieService.getSingle({
        _id: id,
        // userId: user.id,
      });
      return res
        .status(200)
        .json({ message: "Movie details", data: details, success: true });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
        success: false,
      });
    }
  }
}

export default MovieController;
