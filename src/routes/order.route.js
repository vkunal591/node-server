import { Router } from "express";
import { get,getAllWithUsers, create, update, deleteData } from "#controllers/order";
import { authentication } from "#middlewares/auth";

const router = Router();
// router.route("/")
//     .get(getAllWithUsers); // Fetch all orders with populated user details

router.route("/:id?").get(get).post(authentication, create).put(authentication, update).delete(authentication, deleteData);

export default router;
