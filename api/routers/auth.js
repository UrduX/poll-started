import express from "express";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
const authRouter = express.Router();

authRouter.post("/", async (req, res) => {
  const ip = await req.body.ip;
  const hashedIP = CryptoJS.MD5(ip).toString();
  const token = jwt.sign({ ip: hashedIP }, process.env.SECRET_KEY);
  res.json({ token });
});

export default authRouter;
