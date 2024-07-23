import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { getMessages, sendMessage } from "./message.controller.js";

const router = Router();

// secured routes
router.use(verifyJWT)
router.route("/:personId").get(getMessages);
router.route("/:personId").post(sendMessage);

export default router;