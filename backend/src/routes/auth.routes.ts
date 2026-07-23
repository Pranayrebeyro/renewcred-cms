import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth Route Working"
  });
});

router.post("/register", register);
router.post("/login", login);

export default router;