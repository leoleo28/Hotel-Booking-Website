import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
  },
  photos: {
    type: [String],
  },
  flists: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  latitude: {
    type: Number,
  },
  longtitude: {
    type: Number,
  },
  wifi: {
    type: Boolean,
  },
  housekeeping: {
    type: Boolean,
  },
  transport: {
    type: Boolean,
  },
});

export default mongoose.model("Hotel", HotelSchema);
