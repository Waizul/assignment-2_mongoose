import { Request, Response } from "express";

import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";

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

export const UserControllers = {
  createUser,
  getUsers,
};
