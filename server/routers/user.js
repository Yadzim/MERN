const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const router = express.Router();

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  username: {
    type: String,
    required: true,
    // min: 10, //type: number
    // max: 300, //type: number
    // minlength: 3 //chart length
    // required: () => this.name?.length === 3
    // enum: ["azizxon", "abror"] //only this words
    // validate: {
    //   isAsync: true,
    //   validator: (val, calback) => { calback(val && val?.length > 0) },
    //   message: "Username uzunligi 3 dan ko'p bo'lishi kerak"
    // }
    // lowercase: true // auto write lowercase
    // trim: true
   },
  email: String,
  group_id: String,
});

const User = mongoose.model("User", UserSchema);

const validation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(36)
      .pattern(new RegExp("^[a-zA-Z]")),
    username: Joi.string().required().min(3).max(36),
    email: Joi.string()
      .required()
      .min(3)
      .max(36)
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "uz", "org"] },
      }),
    group_id: Joi.string(),
  });

  return schema.validate(data);
};

// get all data
router.get("/", async (req, res) => {
  try {
    const query = req.query;
    const page = JSON.parse(query?.page ?? '1');
    const limit = JSON.parse(query?.limit ?? '10');

    const filter_like = () => {
      let arr = [];
      Object.entries(JSON.parse(query?.filter_like ?? "{}"))?.forEach(
        ([key, value]) => {
          arr.push({ [key]: { ["$regex"]: value } });
        }
      );
      return arr;
    };

    const users = await User.find(
      filter_like()?.length
        ? {
            $and: filter_like(),
            ...JSON.parse(query?.filter ?? "{}"),
          }
        : JSON.parse(query?.filter ?? "{}")
      )
      .sort(JSON.parse(query?.sort ?? "{}"))
      .skip((page - 1) * limit)
      .limit(limit)
      .select();

    res.json({ users, page, perPage: limit, count: await User.countDocuments(), status: 1 });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.find();
    const user = users.find((user) => user.id === id);
    if (user) {
      res.json({ data: user, status: 1 });
    } else {
      res.status(404).json({ status: 0, message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validation(req.body);
    if (error) {
      res.status(400).json({ status: 0, message: error.details[0].message });
      return;
    }

    const newUser = new User({ ...req.body });
    await newUser.save();
    res.json({ data: newUser, status: 1, message: "User added successfully" });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);

    if (user) {
      const { error } = validation(req.body);
      if (error) {
        res.status(400).json({ status: 0, message: error.details[0].message });
        return;
      }

      const newUser = await User.findByIdAndUpdate(id, req.body, { new: true });

      res.json({
        data: newUser,
        status: 1,
        message: "User added successfully",
      });
    } else {
      res.status(404).json({ status: 0, message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      await User.findByIdAndDelete(id);
      res.json({ status: 1, message: "User deleted successfully" });
    } else {
      res.status(404).json({ status: 0, message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
