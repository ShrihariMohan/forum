const mongoose = require("mongoose");
const url = process.env.DB_URL;
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (!err) console.log("Sucessfull..");
    else console.log("Error", err);
  }
);
