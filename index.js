const express = require("express");
const app = express();
const ContactRouter = require("./Router/ContactRouter");
const port = 8080;
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/contacts", ContactRouter);
async function main() {
  await mongoose.connect(
    `mongodb+srv://RajdeeepsadhuDB:${process.env.mongooPass}@cluster0.z1akzwi.mongodb.net/Contact`
  );
}
main().catch((err) => console.log("Mongoose connecting Error"));
app.listen(port, () => {
  console.log(`Server Started on Port: ${port}`);
});
