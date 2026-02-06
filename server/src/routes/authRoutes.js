import express from "express";
import { signUpUser, loginUser } from "../controller/authController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/signup", upload.single("image"), signUpUser);
router.post("/login", loginUser);

export default router;