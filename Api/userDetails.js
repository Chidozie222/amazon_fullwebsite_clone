const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    fname: String,
    email: { type: String, unique: true },
    password: String,
    Phone: String,
    userType: String,
  },
  {
    db: "firstdb",
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsScehma);
