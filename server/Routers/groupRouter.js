const express = require("express");
const {getAllGroups, getOneGroup, createGroup, updateGroup, deleteGroup} = require("../Controllers/groupController");

const router = express.Router();

router.get("/", getAllGroups);
router.get("/:id", getOneGroup);
router.post("/", createGroup);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);

module.exports = router;