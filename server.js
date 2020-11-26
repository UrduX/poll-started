import express from "express";
import http from "http";
import socketIO from "socket.io";
import next from "next";
import jwt from "jsonwebtoken";
import cors from "cors";

import pollRouter from "./api/routers/poll";
import mongoStart from "./utils/mongodb";
import bodyParser from "body-parser";
import authRouter from "./api/routers/auth";
import Poll from "./api/models/Poll";
import { setTimeout } from "timers";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextJsHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const server = http.Server(app);
  const io = socketIO(server);

  app.use(bodyParser.json());
  app.use(cors());

  mongoStart();
  app.use("/api/poll", pollRouter);
  app.use("/api/auth", authRouter);

  io.of("/poll").on("connection", (socket) => {
    socket.on("joinPoll", (pollID) => {
      socket.join(pollID);
      setTimeout(
        async () =>
          io
            .of("/poll")
            .in(pollID)
            .emit("vote", await Poll.findById({ _id: pollID })),
        1000
      );

      console.log("Someone has joined to poll");
    });
    socket.on("vote", async ({ pollID, optionID }) => {
      const token = socket.handshake.query.token;
      const { ip } = await jwt.verify(token, process.env.SECRET_KEY);

      await Poll.updateOne(
        {
          _id: pollID,
          "options.voters.ip": ip,
        },
        { $pull: { "options.$.voters": { ip } } }
      );

      await Poll.updateOne(
        { _id: pollID, "options._id": optionID },
        { $push: { "options.$.voters": { ip, voted_option_id: optionID } } }
      );
      io.of("/poll")
        .in(pollID)
        .emit("vote", await Poll.findById({ _id: pollID }));
      console.log("Someone voted.");
    });
  });

  app.all("*", (req, res) => nextJsHandler(req, res));

  server.listen(port, () => console.log(`> Ready on http://localhost:${port}`));
});
