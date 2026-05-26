import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: String,

  bedrooms: {
    type: [Number], // ✅ VERY IMPORTANT
  },

  bathrooms: Number,
  area: String,
  rawText: String,
});

export default mongoose.model("Property", propertySchema);