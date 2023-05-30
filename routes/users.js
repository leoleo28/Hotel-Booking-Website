import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", [verifyToken, verifyUser], updateUser);

//DELETE
router.delete("/:id", [verifyToken, verifyUser], deleteUser);

//GET
router.get("/:id", [verifyToken, verifyUser], getUser);

//GET ALL
router.get("/", [verifyToken, verifyAdmin], getUsers);

export default router;
