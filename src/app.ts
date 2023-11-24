import express from "express";
import cors from "cors";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Welcome");
});

app.listen(5000, () => {
    console.log('http://localhost:5000/api');
})