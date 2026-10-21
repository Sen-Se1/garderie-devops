const express = require("express");
const { garderie, services, activites } = require("../data/garderie");

const router = express.Router();

router.get("/garderie", (_req, res) => {
  res.json({ success: true, data: garderie });
});

router.get("/services", (_req, res) => {
  res.json({ success: true, count: services.length, data: services });
});

router.get("/activites", (_req, res) => {
  res.json({ success: true, count: activites.length, data: activites });
});

module.exports = router;