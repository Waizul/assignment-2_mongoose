import { Request, Response } from "express";

import { UserServices } from "./user.service";

import {UserValidations} from './user.validation'
import User from "./user.module";


const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const validatedUserData = UserValidations.userValidationSchema.parse(req.body);

    const result = await UserServices.createUserIntoDB(validatedUserData);

    // @ts-ignore
    const { password, ...rest } = result._doc;

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: rest,
    });
  } catch (err: any) {
    console.log("err", err);
    res.status(500).json({
      success: false,
      message: err.message || "Data validation error",
      error: {
        code: err.code || 500,
        description: "User could not be created.",
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
    
    //@ts-ignore
    if (await User.isUserExists(userId)) {
      const validatedUserData = UserValidations.updateUserValidationSchema.parse(req.body);
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

const updateOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { order } = req.body;
    //@ts-ignore
    if (await User.isUserExists(userId)) {
     const result =  await UserServices.updateOrdersIntoDB(userId, order);

      res.status(200).json({
        success: true,
        message: "Order created successfully!",
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

const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    //@ts-ignore
    if (await User.isUserExists(userId)) {
      const result = await UserServices.getOrdersFromDB(userId);

      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
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

const getOrdersTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    //@ts-ignore
    if (await User.isUserExists(userId)) {
      const result = await UserServices.getOrdersTotalPriceFromDB(userId);
      //@ts-ignore
      const totalPrice = result.orders.reduce(
        (acc, item) => item.price * item.quantity + acc,
        0
      );
      res.status(200).json({
        success: true,
        message: "Total price calculated successfully!",
        data: {
          totalPrice: totalPrice,
        },
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
  updateOrders,
  getOrders,
  getOrdersTotalPrice,
};
