import { Request, Response } from "express";

import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";
import User from "./user.module";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const validatedUserData = userValidationSchema.parse(user);

    const result = await UserServices.createUserIntoDB(validatedUserData);

    //@ts-ignore
    const { password, ...rest } = result._doc;

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: rest,
    });
  } catch (err: any) {
    console.log("err", err.issues[0].message);
    res.status(500).json({
      success: false,
      message: err.issues[0].message || err.message || "Data validation error",
      error: {
        code: err.code || 500,
        description:
          err.issues[0].message || err.message || "User could not be created.",
      },
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(201).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: {
        code: 500,
        description: "Something went wrong.",
      },
    });
    console.log(err);
  }
};

const getSingletUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    //@ts-ignore
    if (await User.isUserExists(userId)) {
      const result = await UserServices.getSingleUserFromDB(userId);
      //@ts-ignore
      const { password, ...rest } = result._doc;
      res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data: rest,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Something went wrong",
      error: {
        code: 400,
        description: "Something went wrong",
      },
    });
    console.log(err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;
    //@ts-ignore
    if (await User.isUserExists(userId)) {
      const validatedUserData = userValidationSchema.parse(user);
      const result = await UserServices.updateUserIntoDB(
        userId,
        validatedUserData
      );
      // console.log('result', result)
      //@ts-ignore
      const { password, ...rest } = result._doc;
      res.status(200).json({
        success: true,
        message: "User updated successfully!",
        data: rest,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Something went wrong",
      error: {
        code: 400,
        description: "Something went wrong",
      },
    });
    console.log(err);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    //@ts-ignore
    if (await User.isUserExists(userId)) {
      await UserServices.deleteUserFromDB(userId);
      res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Something went wrong",
      error: {
        code: 400,
        description: "Something went wrong",
      },
    });
    console.log(err);
  }
};

export const UserControllers = {
  createUser,
  getUsers,
  getSingletUser,
  updateUser,
  deleteUser,
};
