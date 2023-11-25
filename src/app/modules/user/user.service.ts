import { UserType } from "./user.interface";
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

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
