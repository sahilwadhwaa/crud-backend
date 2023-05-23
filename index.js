//importing of all the required modules
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/index.js"
import authRoutes from "./routes/auth.js"
import classRoutes from "./routes/classes.js"

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());

//body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// This allows any cross-origin request to access resources on our web page.
app.use(cors());

//routes
app.use("/api", studentRoutes);
app.use("/api", classRoutes);
app.use("/auth", authRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));