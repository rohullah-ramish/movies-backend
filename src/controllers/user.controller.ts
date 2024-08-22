import { Request, Response } from "express";
import { User } from "../utils/interfaces/IUser";
import userService from "../services/user.service";
import verifyPassword from "./../middlewares/verifyPassword";
import {
  generateRefershToken,
  generateToken,
  verifyRefreshToken,
  verifyToken,
} from "../middlewares/jwt";
import hashPassword from "../middlewares/hashPassword";
import { JwtPayload } from "../utils/interfaces/IJwt";

class UserController {
  static async login(req: Request, res: Response) {
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
        const refersh_token = generateRefershToken(
          userAuth[0]._id.toString(),
          userAuth[0].email
        );
        return res
          .status(200)
          .json({ message: "Login successful", token, refersh_token,success:true });
      } else {
        return res.status(401).json({ message: "Invalid credentials",success:false });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error ,success:false});
    }
  }

  static async signup(req: Request, res: Response) {
    try {
      const user: User = {
        email: req.body.email,
        password: req.body.password, // Already hashed by middleware
      };
      const isUserExist = await userService.userExists({ email: user.email });
      if (!isUserExist) {
        const hashPasswords = await hashPassword(user.password);
        const createUser = await userService.create({
          email: user.email,
          password: hashPasswords,
        });
        return res
          .status(200)
          .json({ message: "signup successfully", data: createUser,success:true });
      } else {
        return res.status(200).json({ message: `This Email is already used`,success:false });
      }
    } catch (error) {
      console.log("err", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error,success:false });
    }
  }

  static async refershToken(req: Request, res: Response) {
    try {
      const { token, refersh_token } = req.body;
      const decodedToken = (await verifyToken(token)) as JwtPayload;
      const decodedRefershToken = (await verifyRefreshToken(
        refersh_token
      )) as JwtPayload;
      if (decodedToken.id == decodedRefershToken.id) {
        const userAuth = await userService.getMany({
          email: decodedToken.email,
        });
        const token = generateToken(
          userAuth[0]._id.toString(),
          userAuth[0].email
        );
        const refersh_token = generateRefershToken(
          userAuth[0]._id.toString(),
          userAuth[0].email
        );
      }
      return res
        .status(200)
        .json({ message: "token refersh", token, refersh_token,success:true });
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error ,success:false});
    }
  }
}
export default UserController;
