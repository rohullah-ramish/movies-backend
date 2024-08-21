import { Request, Response } from "express";
import movieService from "../services/movie.service";
import cloudinary from "../db/cloudinary.config";
import { Types } from "mongoose";

export const getMovieList = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const options = {
      population: [
        {
          path: "userId",
          select: "email",
        },
      ],
    };
    const list = await movieService.getMany(
      {
        userId: new Types.ObjectId(user.id),
        isDeleted: false,
      },
      options
    );

    return res.status(200).json({ message: "list !", data: list });
  } catch (error) {
    console.log("err", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const addMovie = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
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
    const createMovie = await movieService.create(body);
    if (createMovie) {
      return res.status(200).json({ message: "addMovie !", createMovie });
    } else {
      return res
        .status(400)
        .json({ message: "error for add movie !", createMovie });
    }
  } catch (error) {
    console.log("err", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const file = req.file;
    const movie = await movieService.getById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
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
      const updated = await movieService.update(id, body);
      return res.status(200).json({ message: "Movie found", data: updated });
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
      const updated = await movieService.update(id, body);
      return res.status(200).json({ message: "Movie found", data: updated });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await movieService.update(id, { isDeleted: true });
    return res.status(200).json({ message: "Movie found", data: updated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};
