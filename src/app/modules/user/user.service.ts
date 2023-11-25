import { UserType } from "./user.interface";
import User from "./user.module";

const createUserIntoDB = async (user: UserType) => {
  const newUser = await User.create(user);
  return newUser;
};

export const UserServices = {
  createUserIntoDB,
};
