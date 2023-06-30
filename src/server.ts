import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { errorHandler } from "./api/v1/middlewares/error.middleware";
import ResponseHelper from "./api/v1/middlewares/response.middleware";
import cookieParser from "cookie-parser";
import router from "./api/v1/modules/index";
import models from "./../src/configs/database/models/index";
import db from "./../src/configs/database/database";
import { Server, Socket } from "socket.io";
import { createServer } from "http";

import { config } from "dotenv";
import { create } from "ts-node";

config();

const app = express();

const corsOptions = {
  origin: "http://localhost:8080",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// Cors
app.use(cors(corsOptions));

// Response
app.use(ResponseHelper.middlewareResponse);

// Parser
app.use(
  express.json({
    verify: (req: Request, res: Response, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", router);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ status: "404", message: "Not Found" });
});

app.use(errorHandler);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("refresh", (data) => {
    console.log("new data received:", data);
    io.emit("newData", data);
  });
});

export { io };

server.listen(3000, async () => {
  try {
    await db.sequelize?.sync({ alter: true });
    await models.associate?.();
    console.log("started server!");
  } catch (error) {
    console.log("Failed to start server!");
    console.log(error);
  }
});
