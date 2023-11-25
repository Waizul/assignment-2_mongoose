import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log("http://localhost:" + config.port + "/api");
    });
  } catch (err) {
    console.log(err);
  }
}

main();
