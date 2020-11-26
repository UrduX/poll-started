import express from "express";
import Poll from "../models/Poll";
import jwt from "jsonwebtoken";
const pollRouter = express.Router();

pollRouter.get("/:id", async (req, res) => {
  try {
    const _id = await req.params.id;
    const poll = await Poll.findById({ _id });
    res.status(202).json(poll);
  } catch (error) {
    res.status(204).json({ error: "Poll didn't find" });
  }
});

pollRouter.post("/create", async (req, res) => {
  const newPoll = new Poll(await req.body.poll);
  const { _id } = await newPoll.save();
  res.json({ _id });
});

export default pollRouter;
