import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
  },
  hotelname: {
    type: String,
    required: true,
  },
  hotelimg: {
    type: String,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  adult: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
    required: true,
  },
  room: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Order", OrderSchema);
