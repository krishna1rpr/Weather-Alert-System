import mongoose from "mongoose";

const IotDeviceSchema = new mongoose.Schema({
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
  districtId: { type: Number, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  lastFetch: { type: Date, required: true },
});

const IotDevice = mongoose.model("IotDevice", IotDeviceSchema);

export default IotDevice;
