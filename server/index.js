// -------------------------  File database  ---------------------------------------------------

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");

const user = require("./routers/userRouter");
const group = require("./routers/groupRouter");

const mongoURI = "mongodb://localhost/simple_crud";
mongoose.connect(mongoURI, { useNewUrlParser: true, family: 4})
.then(() => {
  console.log("MongoDB ga ulandi");
})
.catch((err) => {
  console.log("Xatolik: ", err);
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/users", user);
app.use("/api/groups", group);

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// -------------------------  MongoDB database  -----------------------------------------------------

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // MongoDBga ulanish
// const mongoURI = 'mongodb://localhost:27017/crud';
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// const UserSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
// });

// const User = mongoose.model('User', UserSchema);

// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });

// app.post('/api/users', async (req, res) => {
//   const { name, age } = req.body;
//   try {
//     const newUser = new User({ name, age });
//     await newUser.save();
//     res.json(newUser);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

// app.delete('/api/users/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await User.findByIdAndDelete(id);
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ error: 'Failed to delete user' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
