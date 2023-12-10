const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

app.use(express.json({ extended: false }));

mongoose
  .connect(
    "mongodb://raghuveer:test1234@ac-kg6l3iw-shard-00-00.d0jrvt3.mongodb.net:27017,ac-kg6l3iw-shard-00-01.d0jrvt3.mongodb.net:27017,ac-kg6l3iw-shard-00-02.d0jrvt3.mongodb.net:27017/JWT?ssl=true&replicaSet=atlas-a7q88g-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conncetd to DB");
  });

// app.get("/", (req, res) => {
//   res.send("Home Page!!!!");
// });

app.post("/register", async (req, res) => {
  const reqData = req.body;
  const { name, email, password, confirmPassword } = reqData;

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(400)
        .send("User already exists with that email address");
    }
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
    });

    await user.save();

    res.send("User Registered Successfully");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 5050;

app.listen(5050, () => {
  console.log(`Listening to port ${PORT}`);
});
