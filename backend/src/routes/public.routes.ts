import { Router } from "express";
import {
  getPages,
  getPage,
} from "../controllers/public.controller";

const router = Router();

router.get("/pages", getPages);

router.get("/pages/:slug", getPage);

export default router;