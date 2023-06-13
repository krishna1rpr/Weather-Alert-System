import express, { Express, Request, Response } from "express";
import { config as dotenvConfig } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Logger from "./middleware/logger.js";
import ArduinoRequest from "./controller/ArduinoRequest.js";
import ImdSchedular from "./util/ImdSchedular.js";

// Load environment variables from .env file
dotenvConfig();

// Create Express app instance
const app: Express = express();

// Set up middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected");
    // DownloadWarningOutput();
  } catch (error) {
    throw error;
  }
})();

// Initiating Job Schedular
ImdSchedular();

// Use custom logger middleware
app.use(Logger);

// Define routes
app.get("/", (req: Request, res: Response) => {
  res.send("<h2 style='text-align: center; padding: 47vh 0'>HELLO! WORLD</h2>");
});

app.get("/arduino", ArduinoRequest);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
