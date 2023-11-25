import { Model } from "mongoose";

export type NameType = {
  firstName: string;
  lastName: string;
};
export type AddressType = {
  street: string;
  city: string;
  country: string;
};
export type UserType = {
  userId: number;
  username: string;
  password: string;
  fullName: NameType;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: AddressType;
  orders?: OrderType[];
};

export type OrderType = {
  productName: string;
  price: number;
  quantity: number;
};

export interface UserModel extends Model<UserType> {
  
}