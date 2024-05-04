const {UserModel, userValidation} = require("../Models/userModel")

const getAllUser = async (req, res) => {
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

    const users = await UserModel.find(
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

    res.json({ users, page, perPage: limit, count: await UserModel.countDocuments(), status: 1 });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await UserModel.find();
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
};

const createUser = async (req, res) => {
  try {
    const { error } = userValidation(req.body);
    if (error) {
      res.status(400).json({ status: 0, message: error.details[0].message });
      return;
    }

    const newUser = new UserModel({ ...req.body });
    await newUser.save();
    res.json({ data: newUser, status: 1, message: "User added successfully" });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await UserModel.findById(id);

    if (user) {
      const { error } = userValidation(req.body);
      if (error) {
        res.status(400).json({ status: 0, message: error.details[0].message });
        return;
      }

      const newUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (user) {
      await UserModel.findByIdAndDelete(id);
      res.json({ status: 1, message: "User deleted successfully" });
    } else {
      res.status(404).json({ status: 0, message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

module.exports = {getAllUser, getOneUser, createUser, updateUser, deleteUser}