import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", [verifyToken, verifyAdmin], createHotel);

//UPDATE
router.put("/:id", [verifyToken, verifyAdmin], updateHotel);

//DELETE
router.delete("/:id", [verifyToken, verifyAdmin], deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
