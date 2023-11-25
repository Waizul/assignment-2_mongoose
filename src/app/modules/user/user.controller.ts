import { Request, Response } from "express";

import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await UserServices.createUserIntoDB(user);

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
  }
};

export const UserControllers = {
  createUser,
};
