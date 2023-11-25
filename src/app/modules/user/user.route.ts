import express from "express";
import { UserControllers } from "./user.controller";

const userRoute = express.Router();

userRoute.post("/", UserControllers.createUser);

userRoute.get("/", UserControllers.getUsers);

userRoute.get("/:userId", UserControllers.getSingletUser);

userRoute.put("/:userId", UserControllers.updateUser);

userRoute.delete("/:userId", UserControllers.deleteUser)


export default userRoute;
