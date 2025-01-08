import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import path from "path";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Use environment variable for the port, with a fallback to 5000
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();


// Middleware
app.use(express.json());
app.use(cors());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routers
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
