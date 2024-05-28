import express from "express";
import dotenv from "dotenv";
import { setupMiddleware } from "./middleware";
import { connectDatabase } from "./database";
import { configurePassport } from "./passportConfig";
import { setupRoutes } from "./routes/routes";

dotenv.config();

const app = express();
const port = Number(process.env.PORT!);

// Middleware Setup
setupMiddleware(app);

// Database Connection Setup
connectDatabase();

// Passport Configuration
configurePassport();

// Route Setup
setupRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
