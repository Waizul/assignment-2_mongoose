import { Request, Response } from "express";

import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const validatedUserData = userValidationSchema.parse(user)

    const result = await UserServices.createUserIntoDB(validatedUserData);

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Data validation failed",
      data: err,
    });
    console.log(err)
  }
};

export const UserControllers = {
  createUser,
};
