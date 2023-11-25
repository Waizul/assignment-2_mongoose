import express from "express";
import cors from "cors";
import userRoute from "./app/modules/user/user.service";

export const app = express();

//parsers
app.use(cors());
app.use(express.json());

//routes
app.use('/api/users', userRoute)


app.get("/api", (req, res) => {
  res.send("Welcome");
});

export default app;
