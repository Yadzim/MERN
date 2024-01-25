const express = require("express");
const { deleteUser, updateUser, createUser, getOneUser, getAllUser } = require( "../Controllers/userController" );

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getOneUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
