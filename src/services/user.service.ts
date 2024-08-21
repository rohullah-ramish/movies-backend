import { User } from '../models/user.model';// Adjust the import according to your setup


const userExists = async (findDto: any): Promise<boolean> => {
    const user = await User.findOne(findDto).exec(); // Ensure `.exec()` is used to return a promise
    return user !== null;
};

// Define a function to create a user
const create = async (createDto: any): Promise<any> => {
    const user = new User(createDto);
    return user.save();
};

// Define a function to update a user
const update = async (
    userId: string,
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
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            flatten ? { $set: updateDto } : updateDto,
            {
                lean: options.lean || false,
                upsert: options.upsert || false,
                new: options.returnNew || true,
                session: options.session
            }
        ).populate(options.population || []).exec();
        return updatedUser;
    } catch (error) {
        throw new Error('Problem in update');
    }
};

// Define a function to get many users
const getMany = async (findDto: any, options: { population?: string[]; select?: string[] } = {}): Promise<any[]> => {
    const users = await User.find(findDto, options.select || [])
        .populate(options.population || [])
        .exec();
    if (!users || users.length === 0) {
        throw new Error('Users not found');
    }
    return users;
};

// Define a function to get a user by ID
const getById = async (userId: string, options: { population?: string[] } = {}): Promise<any | null> => {
    const user = await User.findById(userId).populate(options.population || []).exec();
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export default { userExists, create, update, getMany, getById };
