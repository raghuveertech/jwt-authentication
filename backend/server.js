const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const authenticate = require("./middleware/authenticate");

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

app.post("/signin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    if (existingUser.password !== password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: existingUser.id,
      },
    };

    const key = "JWTSecretKey";

    jwt.sign(payload, key, { expiresIn: 36000 }, (err, token) => {
      if (err) {
        throw err;
      }

      return res.json({ token: token });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/myprofile", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const userData = await User.findById(user.id).select("-password");

    if (!userData) {
      res.status(400).send("User does not exist");
    }

    res.json({ user: userData });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/mysettings", authenticate, (req, res) => {});

const PORT = process.env.PORT || 5050;

app.listen(5050, () => {
  console.log(`Listening to port ${PORT}`);
});
