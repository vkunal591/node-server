import { Router } from "express";
import { get, create, update, deleteData } from "#controllers/contact";
import { authentication } from "#middlewares/auth";

const router = Router();

router.route("/:id?").get(authentication,get).post(create).put(authentication,update).delete(authentication,deleteData);

export default router;
