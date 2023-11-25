import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import {
  AddressType,
  NameType,
  OrderType,
  UserModel,
  UserType,
} from "./user.interface";
import config from "../../config";

const userNameSchema = new Schema<NameType>({
  firstName: { type: String },
  lastName: { type: String },
});

const addressSchema = new Schema<AddressType>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const orderSchema = new Schema<OrderType>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<UserType, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: userNameSchema,
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [String] },
  address: addressSchema,
  orders: [orderSchema],
});

//custom static method to find out a user exists or not
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

//hashing user password before saving to mongodb database
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

// userSchema.post('save', function(error:any, doc, next) {
//   if (error.name === 'MongoServerError' && error.code === 11000) {
//     next(new Error('There was a duplicate key error'));
//   } else {
//     next();
//   }
// });
userSchema.pre("find", async function (next) {
  this.find().select("username fullName age email address");
  next();
});

// userSchema.post("findOneAndUpdate", async function (user, next) {
//   this.findOneAndUpdate({ userId: user.userId, user });
//   next();
// });

const User = model<UserType>("User", userSchema);

export default User;
