import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    mongoose.connect(config.database_url as string);

    app.listen(5000, () => {
      console.log("http://localhost:5000/api");
    });
  } catch (err) {
    console.log(err);
  }
}

main();
