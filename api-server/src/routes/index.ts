import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatRouter from "./chat";
import subscribeRouter from "./subscribe";
import contactRouter from "./contact";
import checkoutRouter from "./checkout";
import visitUrlRouter from "./visit-url";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(subscribeRouter);
router.use(contactRouter);
router.use(checkoutRouter);
router.use(visitUrlRouter);

export default router;
