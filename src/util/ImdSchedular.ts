import cron from "node-cron";
import DownloadWarningOutput from "../script/DownloadOutput.js";
import { LoadDistrictData } from "../controller/LoadDistrictData.js";

export default function ImdSchedular() {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Starting sync");

    const outputString: string = await DownloadWarningOutput();

    LoadDistrictData(outputString);
    const date = new Date();
    console.log("Synced with IMD website at :", date.toLocaleString());
  });
}
