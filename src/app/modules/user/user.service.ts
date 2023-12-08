import { OrderType, UserType } from "./user.interface";
import User from "./user.module";

const createUserIntoDB = async (user: UserType) => {
  const newUser = await User.create(user);
  return newUser;
};

const getAllUsersFromDB = async () => {
  const newUser = await User.find();
  return newUser;
};

const getSingleUserFromDB = async (userId: string) => {
  const user = await User.findOne({ userId });
  return user;
};

const updateUserIntoDB = async (userId: string, user: Partial<UserType>) => {
  const nuserId = Number(userId);
  const updatedUser = await User.findOneAndUpdate({ userId: nuserId }, user, {
    new: true,
  });
  console.log(updatedUser);
  return updatedUser;
};

const deleteUserFromDB = async (userId: string) => {
  const nuserId = Number(userId);
  await User.findOneAndDelete({ userId: nuserId });
  return null;
};

const updateOrdersIntoDB = async (userId: string, order: OrderType) => {
  const nuserId = Number(userId);
  const orderUpdated = await User.updateOne(
    { userId: nuserId },
    {
      $addToSet: {
        orders: order,
      },
    },
    {
      new: true,
    }
  );
  return orderUpdated;
};

const getOrdersFromDB = async (userId: string) => {
  const nuserId = Number(userId);
  const orders = await User.findOne({ userId: nuserId }).select("orders");
  return orders;
};

const getOrdersTotalPriceFromDB = async (userId: string) => {
  const nuserId = Number(userId);
  const orders = await User.findOne({ userId: nuserId }).select("orders");
  return orders;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  updateOrdersIntoDB,
  getOrdersFromDB,
  getOrdersTotalPriceFromDB,
};
