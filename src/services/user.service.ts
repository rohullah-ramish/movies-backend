import { User } from "../models/user.model"; // Adjust the import according to your setup

class UserService {
  static async create(createDto: any): Promise<any> {
    const user = new User(createDto);
    return user.save();
  }
  static async userExists(findDto: any): Promise<boolean> {
    const user = await User.findOne(findDto).exec();
    return user !== null;
  }

  static async update(
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
  ): Promise<any | null> {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
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
      return updatedUser;
    } catch (error) {
      throw new Error("Problem in update");
    }
  }

  static async getMany(
    findDto: any,
    options: { population?: string[]; select?: string[] } = {}
  ): Promise<any[]> {
    const users = await User.find(findDto, options.select || [])
      .populate(options.population || [])
      .exec();
    if (!users || users.length === 0) {
      throw new Error("Users not found");
    }
    return users;
  }
  static async getById(
    userId: string,
    options: { population?: string[] } = {}
  ): Promise<any | null> {
    const user = await User.findById(userId)
      .populate(options.population || [])
      .exec();
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

export default UserService;
