import express from "express";
import { UserControllers } from "./user.controller";

const userRoute = express.Router();

userRoute.post("/", UserControllers.createUser);

userRoute.get("/", (req, res) => {
    res.send('user route')
})

export default userRoute;
