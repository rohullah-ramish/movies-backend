import { Movie } from "../models/movie.model";

class MovieService {
  static async moviesExists(findDto: any): Promise<boolean> {
    const movie = await Movie.findOne(findDto).exec(); // Ensure `.exec()` is used to return a promise
    return movie !== null;
  }

  static async create(createDto: any): Promise<any> {
    const movie = new Movie(createDto);
    return movie.save();
  }

  static async update(
    movieId: string,
    updateDto: any,
    options: {
      lean?: boolean;
      upsert?: boolean;
      returnNew?: boolean;
      population?: string[];
      session?: any;
    } = {},
    flatten: boolean = true
  ): Promise<any | null> {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        movieId,
        flatten ? { $set: updateDto } : updateDto,
        {
          lean: options.lean || false,
          upsert: options.upsert || false,
          new: options.returnNew || true,
          session: options.session,
        }
      )
        .populate(options.population || [])
        .exec();
      return updatedMovie;
    } catch (error) {
      throw new Error("Problem in update");
    }
  }

  static async getMany(
    findDto: any,
    options: { population?: any[]; select?: any[] } = {},
    pagination: { limit?: any; page?: any }
  ): Promise<any[]> {
    const movies = await Movie.find(findDto, options.select || [])
      .populate(options.population || [])
      .limit(pagination.limit * 1)
      .skip((pagination.page - 1) * pagination.limit)
      .exec();
    return movies;
  }

  static async getSingle(
    findDto: any,
    options: { population?: any[]; select?: any[] } = {},
  ): Promise<any | null> {
    const movies = await Movie.find(findDto, options.select || [])
    .populate(options.population || [])
    .exec();
  return movies;
  }

  static async getDocumentCount(findDto: any): Promise<any[]> {
    const movies = await Movie.find(findDto).exec();
    return movies;
  }
}

export default MovieService;
