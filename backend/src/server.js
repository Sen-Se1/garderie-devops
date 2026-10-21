const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000"
}));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "garderie-api" });
});

app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route introuvable : ${req.method} ${req.originalUrl}`
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Garderie API disponible sur http://localhost:${PORT}`);
});