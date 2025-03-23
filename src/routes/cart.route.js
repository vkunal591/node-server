import { Router } from "express";
import { get, create, update, deleteData, clearData } from "#controllers/cart";
import { authentication } from "#middlewares/auth";

const router = Router();

router.delete("/clear/:id", clearData);
router.route("/:id?").get(get).post(authentication, create).put(authentication, update).delete(authentication, deleteData);

export default router;
