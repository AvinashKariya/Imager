import express from "express";

import cors from "cors";

import dbConnect from "./database/connect.js";

import postRoutes from "./routes/postRoutes.js";
import dallRoutes from "./routes/dallRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/posts", postRoutes);
app.use("/api/dalle", dallRoutes);

app.get("/", async (req, res) => res.send("Hello from dall-e"));

const startServer = async () => {
  try {
    dbConnect();
    app.listen(5000, () =>
      console.log("server has started on http://localhost:5000/")
    );
  } catch (error) {}
};

startServer();
