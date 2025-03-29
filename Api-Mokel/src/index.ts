import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import routes from "./routes";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({
    message: "API Warung/Restaurant buka Ramadhan 2025",
    status: "API Working",
    endpoints: {
      restaurants: {
        getAll: "GET /api/restaurants",
        create: "POST /api/restaurants",
        getById: "GET /api/restaurants/:id",
        update: "PUT /api/restaurants/:id",
        delete: "DELETE /api/restaurants/:id",
      },
      locations: {
        getAll: "GET /api/locations",
        create: "POST /api/locations",
        getById: "GET /api/locations/:id",
        update: "PUT /api/locations/:id",
        delete: "DELETE /api/locations/:id",
      },
    },
    version: "1.0.0",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
