const express = require("express");
const fs = require("fs");
const path = require("path");
const Joi = require("joi");

const router = express.Router();

const filePath = path.join(__dirname, "../data/users.json");

const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data from file:", error);
    return [];
  }
};

const writeDataToFile = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing data to file:", error);
  }
};

const validation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(36).pattern(new RegExp('^[a-zA-Z]')),
    username: Joi.string().required().min(3).max(36),
    email: Joi.string().required().min(3).max(36).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uz', 'org'] } })
  });

  return schema.validate(data);
};

// get all data
router.get("/", (req, res) => {
  const users = readDataFromFile();
  res.json({users, status: 1});
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const users = readDataFromFile();
  const user = users.find((user) => user.id === id);
  if(user){
    res.json({data: user, status: 1});
  } else {
    res.status(404).json({status: 0, message: "User not found"});
  }
});

router.post("/", (req, res) => {
  const {error} = validation(req.body)
  if(error){
    res.status(400).json({status: 0, message: error.details[0].message});
    return;
  }

  const { name, username, email } = req.body;
  const users = readDataFromFile();
  const newUser = {
    id: new Date().getTime().toString(),
    name,
    username,
    email,
  };
  users.push(newUser);
  writeDataToFile(users);
  res.json({data: newUser, status: 1, message: "User added successfully"});
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  let users = readDataFromFile();
  const i = users.findIndex((user) => user.id === id);

  if(i){
    const {error} = validation(req.body)
    if(error){
      res.status(400).json({status: 0, message: error.details[0].message});
      return;
    }

    const { name, username, email } = req.body;

    users[i].name = name;
    users[i].email = email;
    users[i].username = username;

    writeDataToFile(users);
    res.json({data: users[i], status: 1, message: "User added successfully"});
  } else {
    res.status(404).json({status: 0, message: "User not found"});
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const users = readDataFromFile();
  const updatedUsers = users.filter((user) => user.id !== id);
  writeDataToFile(updatedUsers);
  res.json({ status: 1, message: "User deleted successfully" });
});

module.exports = router