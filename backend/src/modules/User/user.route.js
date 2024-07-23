import { Router } from "express";
import { getAllUsers, getLoggedInUserDetail, loginUser } from "./user.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(loginUser);

// secured routes
router.use(verifyJWT);
router.route("/getMyProfile").get(getLoggedInUserDetail);
router.route("/").get(getAllUsers);

export default router;