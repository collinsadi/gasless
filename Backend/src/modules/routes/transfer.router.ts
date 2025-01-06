import { Router } from "express";
import {
  calculateGasCost,
  claimTokens,
  transferController,
} from "../controllers/transfer/transfer.controller";

const router = Router();

router.post("/transfer", transferController);
router.post("/calculate-gas", calculateGasCost);
router.post("/claim", claimTokens);

export default router;
