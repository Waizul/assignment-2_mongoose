import express from "express";
import cors from "cors";

export const app = express();

//parsers
app.use(cors());
app.use(express.json());

//routes
app.get("/api", (req, res) => {
  res.send("Welcome");
});

export default app;
