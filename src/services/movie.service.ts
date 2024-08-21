import { Movie } from '../models/movie.model';

// Define a function to check if a movie exists
const movieExists = async (findDto: any): Promise<boolean> => {
    const movie = await Movie.findOne(findDto).exec(); // Ensure `.exec()` is used to return a promise
    return movie !== null;
};

// Define a function to create a movie
const create = async (createDto: any): Promise<any> => {
    const movie = new Movie(createDto);
    return movie.save();
};

// Define a function to update a movie
const update = async (
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
): Promise<any | null> => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            movieId,
            flatten ? { $set: updateDto } : updateDto,
            {
                lean: options.lean || false,
                upsert: options.upsert || false,
                new: options.returnNew || true,
                session: options.session
            }
        ).populate(options.population || []).exec();
        return updatedMovie;
    } catch (error) {
        throw new Error('Problem in update');
    }
};

// Define a function to get many movies
const getMany = async (findDto: any,  options: { population?: any[]; select?: any[] } = {}): Promise<any[]> => {
    const movies = await Movie.find(findDto, options.select || [])
        .populate(options.population || [])
        .exec();
    if (!movies || movies.length === 0) {
        throw new Error('Movies not found');
    }
    return movies;
};

// Define a function to get a movie by ID
const getById = async (movieId: string, options: { population?: string[] } = {}): Promise<any | null> => {
    const movie = await Movie.findById(movieId).populate(options.population || []).exec();
    if (!movie) {
        throw new Error('Movie not found');
    }
    return movie;
};

export default { movieExists, create, update, getMany, getById };

