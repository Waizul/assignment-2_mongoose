import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import { AddressType, NameType, OrderType, UserType } from "./user.interface";
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

const userSchema = new Schema<UserType>({
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

//hashing user password before saving to mongodb database
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});


const User = model<UserType>("User", userSchema);

export default User;
