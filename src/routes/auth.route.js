import { Router } from "express";
import { getUser, register, login, updateUser, deleteUser, getAllUser, sendPassword } from "#controllers/auth";
import { authentication } from "#middlewares/auth";

const router = Router();

router.post("/register", register);
router.post("/admin/login", login);
router.post("/send-mail", sendPassword);
router.get("/get-current-user", getUser);
router.route("/user/:id?").get(authentication, getAllUser).put(authentication, updateUser).delete(authentication, deleteUser);

export default router;
