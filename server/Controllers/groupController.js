const {groupValidation, GroupModel} = require("../Models/groupModel")

const getAllGroups = async (req, res) => {
  try {
    const filter_like = () => {
     let arr = [];
     Object.entries(JSON.parse(req.query?.filter_like ?? "{}"))?.forEach(([key,value]) => {arr.push({[key]: {['$regex']: value}})})
      return arr;
    }
    const groups = await GroupModel.find(filter_like()?.length ? {"$or":filter_like()} : {});
    res.json({ groups: groups, status: 1 });
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
}

const getOneGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await GroupModel.find({_id: id});
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
}

const createGroup = async (req, res) => {
  try {
    const { error } = groupValidation(req.body);
    if (error) {
      res.status(400).json({ status: 0, message: error.details[0].message });
      return;
    }

    const newGroup = new GroupModel({...req.body});
    await newGroup.save();
    res.json({ data: newGroup, status: 1, message: "Group added successfully" });
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ error: "Failed to fetch group" });
  }
}

const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await GroupModel.findById(id);

    if (user) {
      const { error } = groupValidation(req.body);
      if (error) {
        res.status(400).json({ status: 0, message: error.details[0].message });
        return;
      }

      const newUser = await GroupModel.findByIdAndUpdate(id, req.body, {new: true})

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
}

const deleteGroup = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await GroupModel.findById(id);
      if (user) {
        await GroupModel.findByIdAndDelete(id);
        res.json({ status: 1, message: "User deleted successfully" });
      } else {
        res.status(404).json({ status: 0, message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }


module.exports = {getAllGroups, getOneGroup, createGroup, updateGroup, deleteGroup}