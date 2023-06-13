import { NextFunction, Request, Response } from "express";
import District from "../model/District.js";
import IotDevice from "../model/IotDevice.js";

function ArduinoRequest(req: Request, res: Response, next: NextFunction) {
  const reqDistrictId = req.query["district"];
  const resResult: {
    district?: string;
    warningText?: string;
    warning: boolean;
  } = { warning: false };
  if (typeof reqDistrictId === "string") {
    District.findOne({ districtId: parseInt(reqDistrictId) })
      .exec()
      .then(async (res) => {
        if (res) {
          if (!res.warning?.innerText?.includes("Nowarning")) {
            resResult.district = res.title;
            resResult.warning = true;
            resResult.warningText = res.warning?.innerText;
          }

          await IotDevice.updateMany(
            { districtId: parseInt(reqDistrictId) },
            { lastFetch: new Date() }
          );
        }
      })
      .finally(() => {
        res.json(resResult);
        next();
        return;
      });
  }
}

export default ArduinoRequest;
