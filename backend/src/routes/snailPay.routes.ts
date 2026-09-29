import { Router } from "express";
import { processPayment } from "../services/snailPay.service.js";
import type { SnailPayRequest } from "../types/snailPay.types.js";

const router = Router();

router.post("/charge", async (req, res) => {
  try {
    const request = req.body as SnailPayRequest;

    const response = await processPayment(request);

    if (response.status === "error") {
      return res.status(500).json(response);
    }


    res.status(200).json(response);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "SNAILPAY_SYSTEM_ERROR"
    ) {
      return res.status(500).json({
        message: "SnailPay is temporarily unavailable",
      });
    }

    return res.status(400).json({
      message: "Payment not approved",
    });
  }
});

export default router;