import { Router } from "express";
import { get, create, update, deleteData, clearData, getByUserId } from "#controllers/cart";
import { authentication } from "#middlewares/auth";

const router = Router();
router.get("/get-cart/:userId", getByUserId);
router.delete("/clear/:id", clearData);
router.route("/:id?").get(get).post(authentication, create).put(authentication, update).delete(authentication, deleteData);

export default router;
