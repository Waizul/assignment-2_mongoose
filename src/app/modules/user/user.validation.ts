import { z } from "zod";

import { AddressType, NameType, OrderType, UserType } from "./user.interface";

const userNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
    })
    .min(3, "First name can not be less than 3 characters")
    .max(20, "First Name can not be more than 20 characters"),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .min(3, "Last name can not be less than 3 characters")
    .max(20, "Last name can not be more than 20 characters"),
});

const addressValidationSchema = z.object({
  street: z.string({
    required_error: "Street is required",
    invalid_type_error: "Street name must be a string",
  }),
  city: z.string({
    required_error: "City is required",
    invalid_type_error: "City name must be a string",
  }),
  country: z.string({
    required_error: "Country is required",
    invalid_type_error: "Country name must be a string",
  }),
});

const orderValidationSchema = z.object({
  productName: z.string({
    required_error: "Product name is required",
    invalid_type_error: "Product name must be a string",
  }),
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price name must be a number",
  }),
  quantity: z.number({
    required_error: "Quantity is required",
    invalid_type_error: "Quantity name must be a number",
  }),
});

const userValidationSchema = z.object({
  userId: z
    .number({
      required_error: "UserId is required",
      invalid_type_error: "UserId must be a number",
    })
    .min(5, "UserId must be 5 digits long."),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(4, "Username must be more than 4 characters."),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password must be more than 6 characters."),
  fullName: userNameValidationSchema,
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(14, "Age must be at least 14 years old.")
    .max(120, "Age must be less than 120 years old."),
  email: z.string().email("Invalid email address."),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema),
});

export default userValidationSchema;
