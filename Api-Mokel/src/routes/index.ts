import { Router } from "express";
import locationRoutes from "./locationRoutes";
import restaurantRoutes from "./restaurantRoutes";

const router = Router();

router.use("/locations", locationRoutes);
router.use("/restaurants", restaurantRoutes);

export default router;
