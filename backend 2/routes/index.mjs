import { Router } from "express";
import adminRouter from "./adminRoute.mjs";
import clientRouter from "./clientRoute.mjs";

const router = Router();
router.use('/admin', adminRouter);
router.use('/user', clientRouter);

export default router;