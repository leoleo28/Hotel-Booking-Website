import express from "express";
import { createOrder, deleteOrder, getOrder } from "../controllers/order.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyToken, createOrder);

//DELETE
router.delete("/:id", deleteOrder);

//GET ALL
router.get("/", verifyToken, getOrder);

export default router;
