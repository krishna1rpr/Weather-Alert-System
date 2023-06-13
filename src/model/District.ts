import mongoose from "mongoose";

const WarningSchema = new mongoose.Schema({
  color: { type: String },
  innerText: { type: String },
});

const DistrictSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  districtId: { type: Number, required: true, unique: true, index: true },
  warning: { type: WarningSchema },
});

const District = mongoose.model("District", DistrictSchema);

export default District;
