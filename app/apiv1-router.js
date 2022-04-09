import express from "express";
import { topicRouter } from "../router/topic-router.js";


const router = express.Router();

router.use("/topics", topicRouter)

export { router as apiV1Router };
