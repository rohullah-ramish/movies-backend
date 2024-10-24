import { Request, Response } from "express";
import { User } from "../utils/interfaces/IUser";
import UserService from "../services/user.service";
import verifyPassword from "./../middlewares/verifyPassword";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
  verifyToken,
} from "../middlewares/jwt";
import hashPassword from "../middlewares/hashPassword";
import { JwtPayload, JwtRefreshPayload } from "../utils/interfaces/IJwt";

class UserController {
  static async login(req: Request, res: Response) {
    try {
      const user: User = {
        email: req.body.email,
        password: req.body.password,
      };
      // Find the user by username
      const userAuth = await UserService.getMany({ email: user.email });
      if (
        userAuth.length > 0 &&
        (await verifyPassword(user.password, userAuth[0]?.password))
      ) {
        const token = generateToken(
          userAuth[0]._id.toString(),
          userAuth[0].email
        );
        const refresh_token = generateRefreshToken(
          userAuth[0]._id.toString(),
          userAuth[0].version
        );
        return res.status(200).json({
          message: "Login successful",
          token,
          refresh_token,
          success: true,
        });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid credentials", success: false });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
        success: false,
      });
    }
  }

  static async signup(req: Request, res: Response) {
    try {
      const user: User = {
        email: req.body.email,
        password: req.body.password, // Already hashed by middleware
      };
      console.log(">>> creating user");
      const isUserExist = await UserService.userExists({ email: user.email });
      if (!isUserExist) {
        const hashPasswords = await hashPassword(user.password);
        const createUser = await UserService.create({
          email: user.email,
          password: hashPasswords,
        });
        return res.status(200).json({
          message: "signup successfully",
          data: createUser,
          success: true,
        });
      } else {
        return res
          .status(200)
          .json({ message: `This Email is already used`, success: false });
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

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refresh_token } = req.body;
      const decodedRefreshToken = (await verifyRefreshToken(
        refresh_token
      )) as JwtRefreshPayload;
      const userAuth = await UserService.getMany({
        _id: decodedRefreshToken.id,
      });
      if (
        userAuth[0].id == decodedRefreshToken.id &&
        userAuth[0].version == decodedRefreshToken.version
      ) {
        const tokenUpdated = generateToken(
          userAuth[0]._id.toString(),
          userAuth[0].email
        );
        return res.status(200).json({
          message: "token refresh",
          token: tokenUpdated,
          refresh_token,
          success: true,
        });
      } else {
        return res
          .status(404)
          .json({ message: "In-Valid User", success: false });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
        success: false,
      });
    }
  }
}
export default UserController;
