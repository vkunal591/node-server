import { Router } from "express";
import { get, create, update, deleteData, getMyOrders } from "#controllers/order";
import { authentication } from "#middlewares/auth";

const router = Router();
router.route("/myorder/:id")
    .get(getMyOrders); // Fetch all orders with populated user details

router.route("/:id?").get(get).post(authentication, create).put(authentication, update).delete(authentication, deleteData);

export default router;
     