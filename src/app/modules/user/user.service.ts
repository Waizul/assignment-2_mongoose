import express from "express";

const userRoute = express.Router();

userRoute.post("/");
userRoute.get("/", (req, res) => {
    res.send('user route')
})

export default userRoute;
