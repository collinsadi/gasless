import { Router } from "express";
import {
  calculateGasCost,
  transferController,
} from "../controllers/transfer/transfer.controller";

const router = Router();

router.post("/transfer", transferController);
router.post("/calculate-gas", calculateGasCost);

export default router;
