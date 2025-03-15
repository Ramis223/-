import { Router } from "express";
import ClientController from "../controllers/clientController.mjs";
import { authToken } from "../middleware/authToken.mjs";
import { upload } from '../config/multerConfig.mjs';

const clientRouter = Router();
clientRouter.post('/create',upload.single('picture'), ClientController.create);
clientRouter.post('/login', ClientController.login);
clientRouter.post('/create_order', authToken, ClientController.createOrder);
clientRouter.get('/get_orders', authToken, ClientController.getOrders);

export default clientRouter;