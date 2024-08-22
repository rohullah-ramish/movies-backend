import { Request, Response } from "express";
import { User } from "../utils/interfaces/IUser";
import userService from "../services/user.service";
import verifyPassword from "./../middlewares/verifyPassword";
import { generateToken } from "../middlewares/jwt";


export const login = async (req: Request, res: Response) => {
  try {
    const user: User = {
      email: req.body.email,
      password: req.body.password,
    };
    // Find the user by username
    const userAuth = await userService.getMany({ email: user.email });
    if (
      userAuth &&
      (await verifyPassword(user.password, userAuth[0].password))
    ) {
      const token = generateToken(
        userAuth[0]._id.toString(),
        userAuth[0].email
      );
      return res.status(200).json({ message: "Login successful", token });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("error",error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const user: User = {
      email: req.body.email,
      password: req.body.password, // Already hashed by middleware
    };
    const isUserExist = await userService.userExists({ email: user.email });
    if (!isUserExist) {
      const createUser = await userService.create(user);
      return res
        .status(200)
        .json({ message: "signup successfully", data: createUser });
    } else {
      return res.status(200).json({ message: `This Email is already used` });
    }
  } catch (error) {
    console.log("err", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};
