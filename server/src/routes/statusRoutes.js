import express from "express";
import Status from "../models/Status.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const statuses = await Status.find();
  res.json(statuses);
});

export default router;
