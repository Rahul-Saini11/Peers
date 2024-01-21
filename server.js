const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const server = require("./index");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database💥");
  });
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server is running on port ", port);
});
//handle the promises rejection whose rejection have not been handled
process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});
