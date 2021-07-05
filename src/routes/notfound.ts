import express from "express";
const router = express.Router();

import { ErrorRes, SuccessRes, FailRes } from "../responses.js";

router.all("/", async (req, res) => {
  return res.json(new ErrorRes("Error", "Not found"));
});

export default router;
