const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const router = express.Router();

const GroupSchema = new mongoose.Schema({
  name: String,
  description: String,
  count: Number,
});

const Group = mongoose.model("Group", GroupSchema);

const validation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(36)
      .pattern(new RegExp("^[a-zA-Z1-9]")),
    description: Joi.string().min(3).max(90),
    count: Joi.number(),
  });

  return schema.validate(data);
};

// get all data
router.get("/", async (req, res) => {
  try {
    const filter_like = () => {
     let arr = [];
     Object.entries(JSON.parse(req.query?.filter_like ?? "{}"))?.forEach(([key,value]) => {arr.push({[key]: {['$regex']: value}})})
      return arr;
    }
    const groups = await Group.find(filter_like()?.length ? {"$or":filter_like()} : {});
    res.json({ groups: groups, status: 1 });
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.find({_id: id});
    // const user = users.find((user) => user.id === id);
    if (group) {
      res.json({ data: group, status: 1 });
    } else {
      res.status(404).json({ status: 0, message: "Group not found" });
    }
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validation(req.body);
    if (error) {
      res.status(400).json({ status: 0, message: error.details[0].message });
      return;
    }

    const newGroup = new Group({...req.body});
    await newGroup.save();
    res.json({ data: newGroup, status: 1, message: "Group added successfully" });
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     let user = await Group.findById(id);

//     if (user) {
//       const { error } = validation(req.body);
//       if (error) {
//         res.status(400).json({ status: 0, message: error.details[0].message });
//         return;
//       }

//       const newUser = await Group.findByIdAndUpdate(id, req.body, {new: true})

//       res.json({
//         data: newUser,
//         status: 1,
//         message: "User added successfully",
//       });
//     } else {
//       res.status(404).json({ status: 0, message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await Group.findById(id);
//     if (user) {
//       await Group.findByIdAndDelete(id);
//       res.json({ status: 1, message: "User deleted successfully" });
//     } else {
//       res.status(404).json({ status: 0, message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

module.exports = router;
